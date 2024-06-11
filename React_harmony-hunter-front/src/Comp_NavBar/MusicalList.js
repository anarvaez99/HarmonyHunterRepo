import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
// import '@aws-amplify/ui-react/styles.css';
// import { withAuthenticator } from '@aws-amplify/ui-react';
import './musicallist.css'
import { FaClipboardList } from "react-icons/fa";
import {Form, Button, Row, Col} from 'react-bootstrap';
import Select from 'react-select';
// import { generateClient } from "aws-amplify/api";
// import { listBroadwayMusicals, getBroadwayMusicals } from "../graphql/queries";
import MusicalDetailsCard from './MusicalDetailsCard';

// const client = generateClient()

function MusicalList() {
  const [musicals, setMusicals] = useState([]);
  const [musicalSearch, setMusicalSearch] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [infoMusical, setInfoMusical] = useState(false);

  const handleInputChange = (selectedOption) => {
    setMusicalSearch(selectedOption.value);
  };

  // Handel search for no Amplify connection
  const handleSearch = async () => {
    setInfoMusical(null)
    setInfoMusical('')
    setShowCard(true)
  };

  // To get all the musicals
  // const handleSearch = async () => {
  //   setInfoMusical(null)
  //   const oneBroadwayMusicals = await client.graphql({
  //     query: getBroadwayMusicals,
  //     variables: { id:  musicalSearch}
  //   });
  //   setInfoMusical(oneBroadwayMusicals.data.getBroadwayMusicals)
  //   setShowCard(true)
  // };

  // useEffect(() => {
  //   const fetchMusicals = async () => {
  //     const query = `
  //       query {
  //         listBroadwayMusicals (limit:300) {
  //           items {
  //             id
  //             MusicalName
  //           }
  //         }
  //       }
  //     `;

  //     try {
  //       const response = await client.graphql({ query});
  //       const transformedData = response.data.listBroadwayMusicals.items.map(item => ({
  //         label: item.MusicalName,
  //         value: item.id
  //       }));
  //       setMusicals(transformedData);
  //     } catch (error) {
  //       console.error("Error fetching musicals:", error);
  //     }
  //   };

  //   fetchMusicals();
  // }, []);

  const handleClose = () => {
    setInfoMusical(null);
  };

  return (
    <div>
      <Navbar/>
      <div className='description'>
        <h1><FaClipboardList /> All Musicals in the List</h1>
        <p className='justified-paragraph'>
          The whole musical list we have, this includes Broadway Musicals in production after 2000 and Musical Movies released after 2000, 
          or the ones I consider popular that where released before 2000, alongside famous Off-Broadway musicals, TV-Shows and other musicals 
          not in regular formats.
        </p>
      </div>
      <div className='search-bar'>
        <Row>
          <Col xs={8}>
            <Form.Label htmlFor="inputSearchBroadway">Search Musical by name:</Form.Label>
            <Select
              id="inputSearchBroadway"
              options={musicals}
              onChange={handleInputChange}
              placeholder="Enter search term..."
            />
          </Col>
          <Col xs={4} className="d-flex align-items-end justify-content-center">
            <Button variant="primary" onClick={handleSearch}>Search</Button>
          </Col>
        </Row>
      </div>
      <br/>
      <div className="center-container">
        {infoMusical && (
          <MusicalDetailsCard musical={infoMusical} onClose={handleClose} />
        )}
      </div>
      <br/>
    </div>
  );
};

export default MusicalList;
// When you add authentication replace line 106 with 108
// export default withAuthenticator(MusicalList);