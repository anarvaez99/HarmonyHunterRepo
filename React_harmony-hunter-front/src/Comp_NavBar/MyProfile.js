// import React, { useState, useEffect } from 'react';
// import Navbar from './Navbar';
// import '@aws-amplify/ui-react/styles.css';
// import { withAuthenticator } from '@aws-amplify/ui-react';
// import './myprofile.css'
// import { CgProfile } from "react-icons/cg";
// import { generateClient } from "aws-amplify/api";
// import { listMusicalInteractions, listBroadwayMusicals } from '../graphql/queries';
// import { getCurrentUser } from 'aws-amplify/auth';
// import { Table, Container, Row, Col, Tooltip, OverlayTrigger, Button, Alert, Spinner } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart, faListCheck, faStar } from '@fortawesome/free-solid-svg-icons';
// import { updateMusicalInteraction } from '../graphql/mutations'
// import { faSpotify, faWikipediaW} from '@fortawesome/free-brands-svg-icons';

// const client = generateClient()

// function MyProfile() {
//   const [user, setUser] = useState(null);
//   const [musicInteractions, setMusicInteractions] = useState([]);
//   const [musicals, setMusicals] = useState([]);
//   const [userLiked, setUserLiked] = useState([]);
//   const [userWatched, setUserWatched] = useState([]);
//   const [userFavorite, setUserFavorite] = useState([]);
//   const [detailsLiked, setDetailsLiked] = useState([]);
//   const [detailsWatched, setDetailsWatched] = useState([]);
//   const [detailsFavorite, setDetailsFavorite] = useState([]);
//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchData = async () => {
//     try {
//       // Fetch current user
//       const currentUser = await getCurrentUser();
//       const userId = currentUser.signInDetails.loginId;
//       setUser(userId);

//       // Fetch all musical interactions for the current user
//       let allMusicalInteractions = [];
//       let musicalInteractionsNextToken = null;
      
//       do {
//         const musicalInteractionsResult = await client.graphql({
//           query: listMusicalInteractions,
//           variables: {
//             filter: { UserName: { eq: userId } },
//             nextToken: musicalInteractionsNextToken,
//           }
//         });

//         allMusicalInteractions = allMusicalInteractions.concat(musicalInteractionsResult.data.listMusicalInteractions.items);
//         musicalInteractionsNextToken = musicalInteractionsResult.data.listMusicalInteractions.nextToken;
//       } while (musicalInteractionsNextToken);

//       setMusicInteractions(allMusicalInteractions);

//       // Fetch musicals
//       const musicalsResult = await client.graphql({ query: listBroadwayMusicals, variables: { limit: 300}  });
//       const allBroadwayMusicals = musicalsResult.data.listBroadwayMusicals.items;
//       setMusicals(allBroadwayMusicals);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (user && musicInteractions.length > 0) {

//       const likedMusicalIds = musicInteractions.filter(item => item.LikedStatus === true).map(item => item.MusicalId);
//       setUserLiked(likedMusicalIds);

//       const watchMusicalIds = musicInteractions.filter(item => item.WatchListStatus === true).map(item => item.MusicalId);
//       setUserWatched(watchMusicalIds);

//       const likedSongsList = musicInteractions.filter(item => item.SongLiked).map(item => ({
//         musicalId: item.MusicalId,
//         songLiked: item.SongLiked
//       }));
//       setUserFavorite(likedSongsList);
//     }
//   }, [user, musicInteractions]);

//   useEffect(() => {
//     if (musicals.length > 0) {
//       const likedMusicalsDetails = musicals.filter(musical => userLiked.includes(musical.id));
//       setDetailsLiked(likedMusicalsDetails);

//       const watchedMusicalsDetails = musicals.filter(musical => userWatched.includes(musical.id));
//       setDetailsWatched(watchedMusicalsDetails);

//       const likedSongsMap = new Map(userFavorite.map(item => [item.musicalId, item.songLiked]));
//       const enrichedMusicalDetails = musicals.filter(musical => likedSongsMap.has(musical.id)).map(musical => ({
//         ...musical,
//         likedSong: likedSongsMap.get(musical.id)
//       }));
//       setDetailsFavorite(enrichedMusicalDetails);
//     }
//   }, [musicals, userLiked, userWatched, userFavorite]);

//   const Link = ({ id, children, title }) => (
//     <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
//       <a href="#">{children}</a>
//     </OverlayTrigger>
//   );

//   const toggleLike = (musid) => {
//     const foundObject = musicInteractions.find(item => item.MusicalId === musid.id);
//     updateInteraction('liked', foundObject)
//   };

//   const toggleWatch = (musid) => {
//     const foundObject = musicInteractions.find(item => item.MusicalId === musid.id);
//     updateInteraction('watch', foundObject)
//   };

//   const toggleSong = (musid) => {
//     const foundObject = musicInteractions.find(item => item.MusicalId === musid.id);
//     updateInteraction('song', foundObject)
//   };

//   const updateInteraction = async (clicked, data) => {
//     let likeInter = data.LikedStatus;
//     let watchInter = data.WatchListStatus;
//     let songInter = data.SongLiked;

//     if (clicked === 'liked'){
//       likeInter = false;
//     } else if (clicked === 'watch'){
//       watchInter = false;
//     } else {
//       songInter = null;
//     }      

//     const updateInter = {
//       id: data.id, // Assuming you have the id of the interaction you want to update
//       LikedStatus: likeInter,
//       WatchListStatus: watchInter,
//       SongLiked: songInter
//     };
    
//     await client.graphql({
//       query: updateMusicalInteraction,
//       variables: { input: updateInter }
//     });

//     fetchData();
//   };

//   const handleRecommendations =  async () => {
//     setLoading(true);
//     const stringifiedList = JSON.stringify(userLiked);
//     const recommendations = await fetchrecommendations(stringifiedList);
//     setLoading(false);
//     const recommendedMusicals = recommendations.map(recommendation => {
//       // Find the musical corresponding to the recommendation ID
//       const musical = musicals.find(musical => musical.id === recommendation.id);

//       // If a matching musical is found, combine its data with the recommendation
//       if (musical) {
//         return {
//           ...recommendation, // Spread the recommendation properties
//           musical: musical.MusicalName, // Add the musical name
//           score: recommendation.score, // Add the score
//           author: musical.MusicAuthor,
//           type: musical.ProductionType,
//           music: musical.SpotifyLink,
//           info: musical.WikiLink
//         };
//       } else {
//         // Handle the case where no matching musical is found
//         return null;
//       }
//     }).filter(Boolean); // Filter out any null values (musicals without recommendations)
    
//     // Now recommendedMusicals contains the combined data of recommendations and musicals
//     setRecommendations(recommendedMusicals);
//   }

//   async function fetchrecommendations(likedmusicals) {
//     try {
//       const response = await fetch(`https://somethingurl.com/dev/getrecommendations?liked_musicals=${likedmusicals}`, {
//         method: 'GET',
//       });
//       const data = await response.json();
//       return data.response;
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       return null;
//     }
//   }

//   return (
//     <div>
//       <Navbar/>
//       {musicInteractions.length === 0 && (
//         <Alert>
//           If you see nothing here, it means you still haven't interacted with the musicals, go to the search tabs to start.
//         </Alert>
//       )}

//       <div className='description'>
//         <h1><CgProfile /> My Profile</h1>
//         <p className='justified-paragraph'>
//           Here you can see what musicals and songs you have liked, your watch list and recommendations related at what you have liked before. 
//         </p>
//       </div>
//       {musicInteractions.length > 0 && (
//         <Container>
//           <Row>
//             <Col>
//               <div>
//                 <h4>Liked Musicals</h4>
//                 <Table bordered hover>
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Type</th>
//                       <th>Interact</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {detailsLiked.map(musical => (
//                       <tr key={musical.MusicalName}>
//                         <td>{musical.MusicalName}</td>
//                         <td>{musical.ProductionType}</td>
//                         <td>
//                           <Link title="Don't like it anymore?" id="t-1">
//                             <Button variant="outline-danger" onClick={() => toggleLike(musical)}>
//                               <FontAwesomeIcon icon={faHeart} style={{ color: 'red'}} />
//                             </Button>
//                           </Link>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </div>
//             </Col>
//             <Col>
//               <div>
//                 <h4>Musicals in Watch List</h4>
//                 <Table bordered hover>
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Type</th>
//                       <th>Interact</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {detailsWatched.map(musical => (
//                       <tr key={musical.MusicalName}>
//                         <td>{musical.MusicalName}</td>
//                         <td>{musical.ProductionType}</td>
//                         <td>
//                           <Link title="Finished watching it?" id="t-2">
//                             <Button variant="outline-primary" onClick={() => toggleWatch(musical)}>
//                               <FontAwesomeIcon icon={faListCheck} style={{ color: 'blue'}} />
//                             </Button>
//                           </Link>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </div>
//             </Col>
//             <Col>
//               <div>
//                 <h4>Favorite songs</h4>
//                 <Table bordered hover>
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Type</th>
//                       <th>Song</th>
//                       <th>Interact</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {detailsFavorite.map(musical => (
//                       <tr key={musical.MusicalName}>
//                         <td>{musical.MusicalName}</td>
//                         <td>{musical.ProductionType}</td>
//                         <td>{musical.likedSong}</td>
//                         <td>
//                           <Link title="Not your favorite song anymore?" id="t-3">
//                             <Button variant="outline-warning" onClick={() => toggleSong(musical)}>
//                               <FontAwesomeIcon icon={faStar} style={{ color: 'yellow'}} />
//                             </Button>
//                           </Link>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </div>
//             </Col>
//           </Row>
//           <Button variant="info" onClick={handleRecommendations}> Get Recommendations </Button>
//           {loading && <Spinner animation="border" variant="primary" />}
//           <div>
//             {recommendations.length > 0 && (
//               <div>
//                 <h4>Recommended Musicals</h4>
//                 <h6>Based on the musicals you have liked</h6>
//                 <Table bordered hover>
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Type</th>
//                       <th>Author</th>
//                       <th>Similarity</th>
//                       <th>Listen on Spotify</th>
//                       <th>Read on Wikipedia</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {recommendations.map(reco => (
//                       <tr key={reco.id}>
//                         <td>{reco.musical}</td>
//                         <td>{reco.type}</td>
//                         <td>{reco.author}</td>
//                         <td>{(reco.score * 100).toFixed(2)}%</td>
//                         <td className="table-center">
//                           <Button variant="outline-success" onClick={() => window.open(reco.music, '_blank')}>
//                             <FontAwesomeIcon icon={faSpotify} style={{ color: 'green' }} />
//                           </Button>
//                         </td>
//                         <td className="table-center">
//                           <Button variant="outline-dark" onClick={() => window.open(reco.info, '_blank')}>
//                             <FontAwesomeIcon icon={faWikipediaW} style={{ color: 'black' }} />
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </div>

//             )}
//           </div>
//         </Container>
//       )}
//     </div>
//   );
// };
  
// export default withAuthenticator(MyProfile);