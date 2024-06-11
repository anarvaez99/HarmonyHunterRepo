import React, { useEffect, useState, useRef  } from 'react';
import Navbar from './Navbar';
// import '@aws-amplify/ui-react/styles.css';
// import { withAuthenticator } from '@aws-amplify/ui-react';
import { FaMasksTheater } from "react-icons/fa6";
import { generateClient } from "aws-amplify/api";
// import { listBroadwayMusicals } from "../graphql/queries";
import { findBestMatch } from 'string-similarity';
import {Table, Row, Col, Form, Button, ListGroup, Spinner, Alert } from 'react-bootstrap';
import MusicalDetailsCard from './MusicalDetailsCard';

const client = generateClient()

function SearchBroadway() {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [musicals, setMusicals] = useState([]);
  const [desiredMusicals, setDesiredMusicals] = useState([]);
  const wordsToMatch = ['Love', 'Friendship', 'Royal', 'Justice', 'Identity', 'Family', 'Adventure', 'Growth', 'Hope', 'History', 'Fantasy', 'Humor', 'Tragedy', 'Animal',
                        'Nature', 'Mythology', 'Diversity', 'Education', 'War', 'Art', 'Travel', 'Politics', 'Magic', 'School', 'Teenager', 'Sports', 'Fashion', 
                        'Crime', 'Survival', 'Dream', 'Fairytale', 'Time', 'Leadership', 'Celebration', 'Loneliness', 'Change', 'Faith', 'Forgiveness', 'Discovery', 
                        'Power', 'Pop', 'Rock', 'Rap', 'Classical', 'Dating', 'Summer', 'Winter', 'Fall', 'Spring', 'Disco', 'Book', 'Revolution', 'Freedom', 'Legacy', 
                        'Courage','Sacrifice', 'Revenge', 'Survival', 'Isolation', 'Passion', 'Pride', 'Reunion', 'Horror', 'God', 'Heaven', 'Hell', 'Work', 'Home']
  const [selectedMusical, setSelectedMusical] = useState(null);
  const [detailClicked, setDetailClicked] = useState(false);
  const [searchDetailClicked, setSearchDetailClicked] = useState(true);
  const [searchMessage, setSearchMessage] = useState('');
  const [wantedTerm, setWantedTerm] = useState(true);
  const [wantedTermMessage, setWantedTermMessage] = useState('');
  const [showButton, setShowButton] = useState(false)
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const [displayedTopics, setDisplayedTopics] = useState([]);
  const [searchdStatus, setSearchdStatus] = useState(false)

  useEffect(() => {
    // Initially shuffle and set the displayed topics
    shuffleTopics();
  }, []);

  const shuffleTopics = () => {
    const shuffledTopics = [...wordsToMatch].sort(() => 0.5 - Math.random()).slice(0, 6);
    setDisplayedTopics(shuffledTopics);
  };


  function isWordInList(word, list) {
    return list.includes(word);
  }

  function capitalizeFirstLetter(word) {
    if (!word) return ''; // Return empty string if word is empty or undefined
    if (word.charAt(0) === word.charAt(0).toUpperCase()) {
      return word; // If first letter is already uppercase, return the word unchanged
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1); // Capitalize the first letter and concatenate it with the rest of the word
    }
  }

  const handleWantedword = () => {
    setWantedTerm(true)
    setShowButton(false)
  }

  const handleSearch = async () => {
    setSearchdStatus(false)
    // Perform the search operation with the searchTerm
    let capTerm = capitalizeFirstLetter(searchTerm);
    let term = '';
    handleClose()

    if (isWordInList(capTerm, wordsToMatch)) {
      setSearchMessage(`Looking for musicals about ${capTerm}`);
      term = capTerm;
    } else {
      setWantedTerm(false);
      const match = findBestMatch(capTerm, wordsToMatch);
      if (match.bestMatch.rating >= 0.5) {
        setWantedTermMessage(`Do you mean ${match.bestMatch.target}?`);
        setShowButton(true);
        setSearchMessage(`Looking for musicals about ${match.bestMatch.target}`);
        term = match.bestMatch.target;
      } 
      // For similar topics
      // else {
      //   const similarTopic = await fetchsimilartopic(capTerm); // Wait for the API call to complete
      //   if (similarTopic) {
      //     setWantedTermMessage(`Unfortunately ${capTerm} is not on the list, how about ${similarTopic}?`);
      //     setShowButton(true);
      //     setSearchMessage(`Looking for musicals about ${similarTopic}`);
      //     term = similarTopic;
      //     setLoading(false);
      //   } 
      //   else {
      //     setWantedTermMessage(`Unfortunately ${capTerm} is not on the list and no similar words were found.`);
      //     setShowButton(false);
      //     setSearchMessage('');
      //     term = null;
      //   }
      // }
    }
    if (term) {
      const filteredMusicals = musicals.filter(musical =>
        musical.MusicalTopics && musical.MusicalTopics.includes(term)
      );
      filteredMusicals.sort((a, b) =>
        b.MusicalTopics[term] - a.MusicalTopics[term]
      );
      // Display the filtered and sorted musicals
      setDesiredMusicals(filteredMusicals);
    }
    setSearchdStatus(true)
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);
    validateInput(inputValue);
  };

  const validateInput = (value) => {
    setSearchDetailClicked(true)
    if (!value.trim()) {
      setError('Input should not be empty.');
    } else if (/\d/.test(value)) {
      setError('Input should not contain numbers.');
    } else if (/\s/.test(value)) {
      setError('Input should not contain spaces.');
    } else {
      setError('');
      setSearchDetailClicked(false)
    }
  };

  // For getting the Boradway musicals 
  // useEffect(() => {
  //   const fetchMusicals = async () => {
  //     const allBroadwayMusicals = await client.graphql({
  //       query: listBroadwayMusicals,
  //       variables: { limit: 300, filter: { SearchType: { eq: 'Broadway'}} }
  //     });
  //     setMusicals(allBroadwayMusicals.data.listBroadwayMusicals.items);
  //   };

  //   fetchMusicals();
  // }, []);

  const handleDetailsClick = (musical) => {
    setSelectedMusical(musical);
    setDetailClicked(true);
  };

  const handleClose = () => {
    setSelectedMusical(null);
    setDetailClicked(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // For the similar topic API
  // async function fetchsimilartopic(searchtopic) {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`https://somethingurl.com/dev/getsimilarword?topic=${searchtopic}`, {
  //       method: 'GET',
  //     });
  //     const data = await response.json();
  //     return data.response;
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     return null;
  //   }
  // }

  const handleItemClick = (topic) => {
    setSearchTerm(topic);
    setSearchDetailClicked(false);
    setError('')
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <Navbar/>
      <Row style={{marginLeft: 50, marginTop: 50}}>
        <Col xs={8}>
          <div>
            <h1><FaMasksTheater /> What is a Broadway Musical?</h1>
            <p className='justified-paragraph'>
              A Broadway musical typically refers to a professional theatrical production staged in one of the 41 designated Broadway theaters in New York City's 
              Theater District, with at least 500 seats. These productions are usually large-scale, high-budget performances that feature elaborate sets, costumes, 
              and musical scores. 
            </p>
          </div>
          <div>
            <Form.Label htmlFor="inputSearchBroadway">Search Broadway Musicals by Topic:</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="text"
                id="inputSearchBroadway"
                placeholder="Enter search term..."
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                ref={inputRef} 
              />
              {loading && <Spinner animation="border" variant="primary" />}
              <Button variant="primary" onClick={handleSearch} disabled={searchDetailClicked}>Search</Button>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </div>
          {showButton && 
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 5}}>
              <div>
                <h6>{capitalizeFirstLetter(wantedTermMessage)}</h6>
              </div>
              <div style={{marginLeft: 5}}>
                <Button variant="outline-success" size="sm" onClick={handleWantedword}>Yes!</Button>
              </div>
            </div>
          }
        </Col>

        <Col xs={4}>
          <div className="d-flex justify-content-center">
            <ListGroup as="ul">
              <ListGroup.Item as="li" active>Suggested Topics (click to search) </ListGroup.Item>
              {displayedTopics.map((topic, index) => (
                <ListGroup.Item as="li" key={index} onClick={() => handleItemClick(topic)}>
                  {topic}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Button variant="secondary" onClick={shuffleTopics}>Shuffle Topics</Button>
          </div>
        </Col>
      </Row>
      <br/><br/>
      {desiredMusicals.length > 0 && wantedTerm === true && (
        <div className='tablemusicals' style={{ display: 'flex', marginLeft:20, marginRight:20}}>
          <div style={{ flex: 1 }}>
            <h4>{searchMessage}</h4>
            <div style={{ height: '250px', overflowY: 'scroll' }}> 
              <Table responsive>
                <thead style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                  <tr>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Year</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {desiredMusicals.map(musical => (
                    <tr key={musical.MusicalName}>
                      <td>{musical.MusicalName}</td>
                      <td>{musical.MusicAuthor}</td>
                      <td>{musical.ReleaseYear}</td>
                      <td>
                      <Button onClick={() => handleDetailsClick(musical)} disabled={detailClicked}>
                        Details
                      </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className='musicaldetails' style={{ marginLeft:20, }}> 
            {selectedMusical && (
              <MusicalDetailsCard musical={selectedMusical} onClose={handleClose} />
            )}
          </div>
        </div>
      )}
      {desiredMusicals.length === 0 && searchdStatus === true &&(
        <div> 
          <Alert>
            No musicals related with this topic, try in another section or another topic.
          </Alert>
        </div>
      )}
    </div>
  );
};

export default SearchBroadway;
// When you add authentication replace line 296 with 298
// export default withAuthenticator(SearchBroadway);