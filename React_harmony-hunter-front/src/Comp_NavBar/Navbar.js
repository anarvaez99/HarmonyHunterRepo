import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { signOut } from 'aws-amplify/auth';
import '@aws-amplify/ui-react/styles.css';
import { Button } from 'react-bootstrap';
import Logo from '../Assets/circleLogo.png'

const Navbar = () => {
  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <div className='sum'>
      <div className='logo'> 
        <img src={Logo} alt="Logo" style={{ width: '80px', height: '80px' }}/>
        Harmony Hunter 
      </div>
      <nav className='item'>
        <ul className='ul'>
          <li>
            <Link to='/'> Home </Link>
          </li>
          <li>
            <Link to='/searchbroadway'> Search Broadway </Link>
          </li>
          <li>
            <Link to='/searchmovies'> Search Movies </Link>
          </li>
          <li>
            <Link to='/searchmiscellaneous'> Search Miscellaneous</Link>
          </li>
          <li>
            <Link to='/musicalslist'> Musicals List</Link>
          </li>
          {/* <li>
            <Link to='/myprofile'> My Profile </Link>
          </li>
          <li>
            <Link to='/trending'> Trending </Link>
          </li>
          <li>
            <Button type="button" className="btn btn-light btn-signout" onClick={handleSignOut}>Sign Out</Button>
          </li> */}
        </ul>  
      </nav>
    </div>
  );
}
export default Navbar