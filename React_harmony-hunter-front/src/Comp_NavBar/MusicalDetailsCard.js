// import React, {useState, useEffect} from 'react';
// import { Row, Col, Card, Button, Modal, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
// import { getCurrentUser } from 'aws-amplify/auth';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart, faListCheck, faStar, faMessage } from '@fortawesome/free-solid-svg-icons';
// import { faSpotify, faWikipediaW} from '@fortawesome/free-brands-svg-icons';
// import { generateClient } from "aws-amplify/api";
// import { listMusicalInteractions } from '../graphql/queries';
// import { createMusicalInteraction, updateMusicalInteraction, createComments } from '../graphql/mutations'
// import { v4 as uuidv4 } from 'uuid';


// const client = generateClient()

// const MusicalDetailsCard = ({ musical, onClose }) => {
//     const {
//         id,
//         MusicAuthor,
//         MusicDuration,
//         MusicalName,
//         MusicalSummary,
//         PosterLink,
//         SpotifyLink,
//         WikiLink,
//         TrackList,
//         MusicalTopics,
//         ReleaseYear
//     } = musical;
//     const [user, setUser] = useState(null);
//     const [liked, setLiked] = useState(false);
//     const [watchList, setWatchList] = useState(false);
//     const [musicInteractions, setMusicInteractions] = useState([]);
//     const [uniqueInteraction, setUniqueInteraction] = useState({});
//     const [favoriteTrack, setFavoriteTrack] = useState('');
//     const [showModal, setShowModal] = useState(false);
//     const [message, setMessage] = useState('');
//     const [spoilers, setSpoilers] = useState(false);
//     const [likedTooltip, setLikedTooltip] = useState('Liked the Musical?');
//     const [watchedTooltip, setWatchedTooltip] = useState('Add to your WatchList?');

//     const toggleModal = () => {
//         setShowModal(!showModal);
//     };

//     const leaveComment = () => {
//         setShowModal(true);
//     };

//     const handleMessageChange = (event) => {
//         setMessage(event.target.value);
//     };

//     const handleSpoilersChange = (event) => {
//         setSpoilers(event.target.checked);
//     };

//     const Link = ({ id, children, title }) => (
//         <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
//           <a href="#">{children}</a>
//         </OverlayTrigger>
//     );
    

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         // Here you can handle submitting the message and spoilers value, for example, sending them to an API
//         const uuidfordynamo = uuidv4();
//         const createMessage =  {
//             id: uuidfordynamo,
//             MusicalId: id,
//             IsSpoiler: spoilers,
//             Comment: message
//         }
//         await client.graphql({
//             query:createComments,
//             variables: {input: createMessage}
//         });
//         // Clear message input
//         setMessage('');
//         // Close modal
//         toggleModal();
//     };

//     const fetchMusicalInteractions = async () => {
//         const allBroadwayMusicals = await client.graphql({
//             query: listMusicalInteractions
//         });
//         setMusicInteractions(allBroadwayMusicals.data.listMusicalInteractions.items);
//     };
    
//     useEffect(() => {
//         fetchMusicalInteractions();
//     }, [musical]);

//     useEffect(() => {
//         if (musicInteractions.length > 0) {
//             const filteredArray = musicInteractions.filter(item => {
//                 return item.MusicalId === id && item.UserName === user;
//             });
//             if (filteredArray.length > 0) {
//                 const specificElement = filteredArray[0];
//                 setUniqueInteraction(specificElement)
//                 setLiked(specificElement.LikedStatus)
//                 if (specificElement.LikedStatus === true){
//                     setLikedTooltip('Don´t like it anymore?')
//                 } else{
//                     setLikedTooltip('Liked the Musical?')
//                 }
//                 setWatchList(specificElement.WatchListStatus)
//                 if (specificElement.WatchListStatus === true){
//                     setWatchedTooltip('Already watched it?')
//                 } else{
//                     setWatchedTooltip('Add to your WatchList?')
//                 }
                
//                 setFavoriteTrack(specificElement.SongLiked)

//             }
//         }
//     }, [musicInteractions]);

//     const updateInteraction = async (clicked, data) => {
//         let likeInter = data.LikedStatus;
//         let watchInter = data.WatchListStatus;
//         let songInter = data.SongLiked;
    
//         if (clicked === 'liked'){
//             likeInter = !likeInter;
//         } else if (clicked === 'watch'){
//             watchInter = !watchInter;
//         } else {
//             songInter = clicked;
//         }      
    
//         const updateInter = {
//             id: data.id, // Assuming you have the id of the interaction you want to update
//             LikedStatus: likeInter,
//             WatchListStatus: watchInter,
//             SongLiked: songInter
//         };
        
//         await client.graphql({
//             query: updateMusicalInteraction,
//             variables: { input: updateInter }
//         });

//         fetchMusicalInteractions();
//     };

//     const createInteraction = async (clicked) => {
//         let likeInter = false
//         let watchInter = false
//         let songInter = ''
//         const uuidfordynamo = uuidv4();

//         if (clicked === 'liked'){
//             likeInter = true
//         } else if (clicked === 'watch'){
//             watchInter = true
//         } else {
//             songInter = clicked
//         }      
//         const createInter =  {
//             id: uuidfordynamo,
//             UserName: user,
//             MusicalId: id,
//             LikedStatus: likeInter,
//             WatchListStatus: watchInter,
//             SongLiked: songInter,
//         }
      
//         await client.graphql({
//             query:createMusicalInteraction,
//             variables: {input: createInter}
//         });

//         fetchMusicalInteractions();
//     }

//     const toggleLike = () => {
//         if (Object.getOwnPropertyNames(uniqueInteraction).length > 0) {
//             updateInteraction('liked', uniqueInteraction)
//         } else {
//             createInteraction('liked');
//             setLiked(true)
//             setLikedTooltip('Don´t like it anymore?')
            
//         }

//     };

//     const toggleWatch = () => {
//         if (Object.getOwnPropertyNames(uniqueInteraction).length > 0) {
//             updateInteraction('watch', uniqueInteraction)
//         } else {
//             createInteraction('watch');
//             setWatchList(true)
//             setWatchedTooltip('Already watched it?')
//         }
//     };

//     useEffect(() => {
//         fetchUser();
//     }, []);

//     async function fetchUser() {
//         try {
//         const currentUser = await getCurrentUser();
//         const useId = currentUser.signInDetails.loginId 
//         setUser(useId);
//         } catch (error) {
//         console.error('Error fetching user:', error);
//         }
//     }

//     const toggleFavorite = (trackName) => {
//         let likedSong = trackName === favoriteTrack ? '' : trackName
//         if (Object.getOwnPropertyNames(uniqueInteraction).length > 0) {
//             updateInteraction(likedSong, uniqueInteraction)
//         } else {
//             createInteraction(likedSong);
//             setFavoriteTrack(likedSong)
//         }
        
//     };

//     return (
//         <Card style={{ width: '50rem' }}>
//             <Card.Body>
//                 <Button variant="danger" onClick={onClose} className="float-end">Close</Button>
//                 <Row>
//                     <Col md={4}>
//                         <Card.Img variant="top" src={PosterLink} />
//                     </Col>
//                     <Col md={8}>
//                         <Card.Title>Musical name: {MusicalName}</Card.Title>
//                         <Card.Text>
//                             Music Author: {MusicAuthor} <br />
//                             Release Year: {ReleaseYear} <br />
//                             Click here to: <br />
//                             <FontAwesomeIcon icon={faWikipediaW} style={{ color: 'black' }} />
//                             <a href={WikiLink} target="_blank" rel="noopener noreferrer" style={{ color: 'black', marginLeft: 20 }}>Read more on Wikipedia</a><br />
//                             <FontAwesomeIcon icon={faSpotify} style={{ color: 'green' }} />
//                             <a href={SpotifyLink} target="_blank" rel="noopener noreferrer" style={{ color: 'black', marginLeft: 20 }}>Listen on Spotify</a><br />
//                             Music Duration: {MusicDuration} <br />
//                             <Link title={likedTooltip} id="t-1">
//                                 <Button variant="outline-danger" onClick={toggleLike}>
//                                     <FontAwesomeIcon icon={faHeart} style={{ color: liked ? 'red' : 'black' }} />
//                                 </Button>
//                             </Link>
//                             <Link title={watchedTooltip} id="t-2">
//                                 <Button variant="outline-primary" onClick={toggleWatch} style={{ marginLeft: 20 }}>
//                                     <FontAwesomeIcon icon={faListCheck} style={{ color: watchList ? 'blue' : 'black' }} />
//                                 </Button>
//                             </Link>
//                             <Link title='Leave a comment?' id="t-3">
//                                 <Button variant="outline-success" onClick={leaveComment} style={{ marginLeft: 20 }}>
//                                     <FontAwesomeIcon icon={faMessage} style={{ color: 'black' }} />
//                                 </Button>
//                             </Link>
//                         </Card.Text>
//                     </Col>
//                 </Row>
//                 <Modal show={showModal} onHide={toggleModal}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Leave a Comment for {MusicalName}</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <Form onSubmit={handleSubmit}>
//                             <Form.Group controlId="message">
//                                 <Form.Label>Comment:</Form.Label>
//                                 <Form.Control as="textarea" rows={3} value={message} onChange={handleMessageChange} />
//                             </Form.Group>
//                             <Form.Group controlId="spoilers">
//                                 <Form.Check
//                                     type="switch"
//                                     id="custom-switch"
//                                     label="Does it contain Spoilers?"
//                                     checked={spoilers}
//                                     onChange={handleSpoilersChange}
//                                 />
//                             </Form.Group>
//                             <Button variant="primary" type="submit">
//                                 Submit
//                             </Button>
//                         </Form>
//                     </Modal.Body>
//                 </Modal>
//                 <Card.Text>{MusicalSummary}</Card.Text>
//                 <Row>
//                     <h5>Tracklist:</h5>
//                     <h6>Choose your favorite song by clicking the star. Only one song per musical.</h6>
//                     <Col md={6}>
//                         <br/>
//                         <ul>
//                             {JSON.parse(TrackList).slice(0, Math.ceil(JSON.parse(TrackList).length / 2)).map((track, index) => (
//                                 <li
//                                     key={index}>{track}
//                                     <Button variant="outline-warning" size="sm" style={{ marginLeft: 20 }} onClick={() => toggleFavorite(track)}>
//                                         <FontAwesomeIcon icon={faStar} style={{ color: track === favoriteTrack ? 'yellow' : 'black' }} />
//                                     </Button>
//                                 </li>
//                             ))}
//                         </ul>
//                     </Col>
//                     <Col md={6}>
//                         <h5>&nbsp;</h5>
//                         <ul>
//                             {JSON.parse(TrackList).slice(Math.ceil(JSON.parse(TrackList).length / 2)).map((track, index) => (
//                                 <li
//                                     key={index}>{track}
//                                     <Button variant="outline-warning" size="sm" style={{ marginLeft: 20 }} onClick={() => toggleFavorite(track)}>
//                                         <FontAwesomeIcon icon={faStar} style={{ color: track === favoriteTrack ? 'yellow' : 'black' }} />
//                                     </Button>
//                                 </li>
//                             ))}
//                         </ul>
//                     </Col>
//                 </Row>
//                 <Col md={6}>
//                     <h5>Topics</h5>
//                     {Object.entries(JSON.parse(MusicalTopics)).map(([topic, value]) => (
//                         <span key={topic} className="badge bg-secondary me-2">{`#${topic}`}</span>
//                     ))}
//                 </Col>
//             </Card.Body>
//         </Card>
//     );
// };

// export default MusicalDetailsCard;
