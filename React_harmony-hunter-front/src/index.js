import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import Home from './Comp_NavBar/Home';
import SearchBroadway from './Comp_NavBar/SearchBroadway';
import SearchMovies from './Comp_NavBar/SearchMovies';
import SearchMiscellaneous from './Comp_NavBar/SearchMiscellaneous';
import MusicalList from './Comp_NavBar/MusicalList';
import MyProfile from './Comp_NavBar/MyProfile';
import TrendingPage from './Comp_NavBar/TrendingPage';
// import { Amplify } from 'aws-amplify';
// import awsExports from './aws-exports';
// Amplify.configure(awsExports);




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path ='/' element={<Home/>}/>
      <Route path ='/searchbroadway' element={<SearchBroadway/>}/>
      <Route path ='/searchmovies' element={<SearchMovies/>}/>
      <Route path ='/searchmiscellaneous' element={<SearchMiscellaneous/>}/>
      <Route path ='/musicalslist' element={<MusicalList/>}/>
      {/* <Route path ='/myprofile' element={<MyProfile/>}/>
      <Route path ='/trending' element={<TrendingPage/>}/> */}
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
