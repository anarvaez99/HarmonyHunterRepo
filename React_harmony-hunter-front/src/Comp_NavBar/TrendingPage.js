// import './trendingpage.css'
// import { IoIosTrendingUp } from "react-icons/io";
// import React, { useState, useEffect} from 'react';
// import Navbar from './Navbar';
// import '@aws-amplify/ui-react/styles.css';
// import { withAuthenticator } from '@aws-amplify/ui-react';
// import { generateClient } from "aws-amplify/api";
// import { listMusicalInteractions, listBroadwayMusicals, listComments } from '../graphql/queries';
// import { onCreateMusicalInteraction, onUpdateMusicalInteraction, onCreateComments } from '../graphql/subscriptions';
// import { Table, Container, Row, Col, Button } from 'react-bootstrap';


// const client = generateClient()

// function TrendingPage() {
//   const [musicInteractions, setMusicInteractions] = useState([]);
//   const [musicals, setMusicals] = useState([]);
//   const [topMusicals, setTopMusicals] = useState([]);
//   const [topSongs, setTopSongs] = useState([]);
//   const [commentInfo, setCommentInfo] = useState([]);
//   const [visibleComments, setVisibleComments] = useState({});

//   const toggleSpoilerVisibility = (id) => {
//     setVisibleComments((prev) => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const fetchData = async () => {
//     try {
//       let allMusicalInteractions = [];
//       let musicalInteractionsNextToken = null;
      
//       do {
//         const musicalInteractionsResult = await client.graphql({
//           query: listMusicalInteractions,
//           variables: {
//             nextToken: musicalInteractionsNextToken,
//           }
//         });
  
//         allMusicalInteractions = allMusicalInteractions.concat(musicalInteractionsResult.data.listMusicalInteractions.items);
//         musicalInteractionsNextToken = musicalInteractionsResult.data.listMusicalInteractions.nextToken;
//       } while (musicalInteractionsNextToken);
      
//       setMusicInteractions(allMusicalInteractions); // Update state with fetched data
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
  

//   const fetchMusicals = async () => {
//     try {
//       const allBroadwayMusicals = await client.graphql({
//         query: listBroadwayMusicals,
//         variables: { limit: 300 }
//       });
//       setMusicals(allBroadwayMusicals.data.listBroadwayMusicals.items); // Update state with fetched data
//     } catch (error) {
//       console.error('Error fetching musicals:', error);
//     }
//   };

//   useEffect(() => {
//     fetchMusicals()
//   }, []);

//   useEffect(() => {
//     fetchData()
//     fetchComments()
//   }, [musicals]);

//   const fetchComments = async () => {
//     try {
//       let allComments = [];
//       let commentsNextToken = null;
  
//       do {
//         const commentsResult = await client.graphql({
//           query: listComments,
//           variables: {
//             nextToken: commentsNextToken,
//             limit: 200
//           }
//         });
  
//         allComments = allComments.concat(commentsResult.data.listComments.items);
//         commentsNextToken = commentsResult.data.listComments.nextToken;
//       } while (commentsNextToken);
      
//       const combinedList = allComments.map(comment => {
//         const musical = musicals.find(musical => musical.id === comment.MusicalId);
//         const date = new Date(comment.createdAt);
//         const formattedDate = new Intl.DateTimeFormat('en-US', {
//           year: 'numeric',
//           month: '2-digit',
//           day: '2-digit',
//           hour: '2-digit',
//           minute: '2-digit',
//           hour12: false,
//           timeZoneName: 'short'
//         }).format(date).replace(',', '');
      
//         return {
//           id: comment.id,
//           MusicalName: musical ? musical.MusicalName : '', // Check if musical exists
//           ProductionType: musical ? musical.ProductionType : '', // Check if musical exists
//           Comment: comment.Comment,
//           IsSpoiler: comment.IsSpoiler,
//           CreatedAt: formattedDate
//         };
//       }).sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt));
//       console.log(combinedList);
      
  
//       setCommentInfo(combinedList);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     const createSub = createSubscriptionComment(onCreateComments);
//     return () => {
//       createSub.unsubscribe();
//     };
//   }, []);

//   const createSubscription = (operationType) => {
//     return client.graphql({ query: operationType }).subscribe({
//       next: fetchData,
//       error: (error) => {
//         console.error('Error subscribing:', error);
//       },
//     });
//   };

//   const createSubscriptionComment = (operationType) => {
//     return client.graphql({ query: operationType }).subscribe({
//       next: fetchComments,
//       error: (error) => {
//         console.error('Error subscribing:', error);
//       },
//     });
//   };

//   useEffect(() => {
//     const createSub = createSubscription(onCreateMusicalInteraction);
//     const updateSub = createSubscription(onUpdateMusicalInteraction);
  
//     return () => {
//       createSub.unsubscribe();
//       updateSub.unsubscribe();
//     };
//   }, []);

//   const getLikesCount = (interactions) => {
//     const likeCounts = {};
//     interactions.forEach(interaction => {
//       if (interaction.LikedStatus) {
//         likeCounts[interaction.MusicalId] = (likeCounts[interaction.MusicalId] || 0) + 1;
//       }
//     });
//     return likeCounts;
//   };

//   const mergeAndSortData = (interactions, musicals) => {
//     const likeCounts = getLikesCount(interactions);
//     const mergedData = musicals.map(musical => {
//       return {
//         id: musical.id,
//         MusicalName: musical.MusicalName,
//         ProductionType: musical.ProductionType,
//         NumberLikes: likeCounts[musical.id] || 0
//       };
//     });
//     mergedData.sort((a, b) => b.NumberLikes - a.NumberLikes);
//     return mergedData;
//   };

//   const getFavoriteCount = (interactions) => {
//     const likeCounts = {};
//     interactions.forEach(interaction => {
//       if (interaction.LikedStatus && interaction.SongLiked) {
//         const key = `${interaction.MusicalId}/${interaction.SongLiked}`;
//         likeCounts[key] = (likeCounts[key] || 0) + 1;
//       }
//     });
//     return likeCounts;
//   };

//   const mergeAndSortDataSongs = (interactions, musicals) => {
//     const likeCounts = getFavoriteCount(interactions);
//     const mergedData = [];
//     musicals.forEach(musical => {
//       for (const [key, count] of Object.entries(likeCounts)) {
//         const [musicalId, songLiked] = key.split('/');
//         if (musical.id === musicalId) {
//           mergedData.push({
//             id: songLiked + String(count),
//             MusicalName: musical.MusicalName,
//             ProductionType: musical.ProductionType,
//             LikedSong: songLiked,
//             NumberLikes: count
//           });
//         }
//       }
//     });
  
//     mergedData.sort((a, b) => b.NumberLikes - a.NumberLikes);
//     return mergedData;
//   };

//   useEffect(() => {
//     const topFavoriteSongs = mergeAndSortDataSongs(musicInteractions, musicals);
//     setTopSongs(topFavoriteSongs)
//     const topLikedMusicals = mergeAndSortData(musicInteractions, musicals);
//     const filteredMusicals = topLikedMusicals.filter(musical => musical.NumberLikes > 0);
//     setTopMusicals(filteredMusicals)
//   }, [musicInteractions]);

//   return (
//     <div>
//       <Navbar/>
//       <div className='description'>
//         <h1><IoIosTrendingUp /> Trending </h1>
//         <p className='justified-paragraph'>
//           Here you can see the most liked musicals and songs . You can also read comments about the musicals other users have written. 
//         </p>
//       </div>
//       <Container>
//         <Row>
//           <Col style={{ width: '70%' }}>
//             <div>
//               <h4>Top Liked Musicals</h4>
//               <div style={{ height: '250px', overflowY: 'scroll' }}> 
//                 <Table bordered hover style={{ width: '100%' }}>
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Type</th>
//                       <th>Likes</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {topMusicals.map(musical => (
//                       <tr key={musical.id}>
//                         <td>{musical.MusicalName}</td>
//                         <td>{musical.ProductionType}</td>
//                         <td>{musical.NumberLikes}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table> 
//               </div>
//             </div>
//           </Col>
//           <Col>
//             <div>
//               <h4>Top Liked Songs</h4>
//               <div style={{ height: '250px', overflowY: 'scroll' }}> 
//                 <Table bordered hover>
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Type</th>
//                       <th>Song</th>
//                       <th>Likes</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {topSongs.map(musical => (
//                       <tr key={musical.id}>
//                         <td>{musical.MusicalName}</td>
//                         <td>{musical.ProductionType}</td>
//                         <td>{musical.LikedSong}</td>
//                         <td>{musical.NumberLikes}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//       <br/>
//       <div style={{ marginLeft:20, marginRight:20 }}>
//         <h4>Latest Comments</h4>
//         <h6>Some might have spoilers, click at your own risk.</h6>          
//         <Table bordered hover>
//           <thead>
//             <tr>
//             <th style={{ width: '15%' }}>Musical Name</th>
//             <th style={{ width: '10%' }}>Production Type</th>
//             <th style={{ width: '15%' }}>Date Published</th>
//             <th style={{ width: '10%' }}>Spoiler</th>
//             <th style={{ width: '50%' }}>Comment</th>
//             </tr>
//           </thead>
//           <tbody>
//             {commentInfo.map((comment) => (
//               <tr key={comment.id}>
//                 <td>{comment.MusicalName}</td>
//                 <td>{comment.ProductionType}</td>
//                 <td>{comment.CreatedAt}</td>
//                 <td>
//                   {comment.IsSpoiler ? (
//                     <Button onClick={() => toggleSpoilerVisibility(comment.id)}>
//                       {visibleComments[comment.id] ? 'Hide Spoiler' : 'Show Spoiler'}
//                     </Button>
//                   ) : (
//                     'No'
//                   )}
//                 </td>
//                 <td className="comment-cell">
//                   {comment.IsSpoiler && visibleComments[comment.id] ? (
//                     <span>{comment.Comment}</span>
//                   ) : (
//                     comment.IsSpoiler ? 'Comment hidden' : comment.Comment
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
      
//     </div>
//   );
// };
  
// export default withAuthenticator(TrendingPage);