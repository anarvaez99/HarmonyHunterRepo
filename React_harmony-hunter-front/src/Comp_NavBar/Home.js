import Navbar from './Navbar';
// import '@aws-amplify/ui-react/styles.css';
// import { withAuthenticator } from '@aws-amplify/ui-react';
import LogoHH from "../Assets/fulllogo.png"
import './home.css'
import { BsFillSearchHeartFill, BsHeartFill, BsCardChecklist , BsCollectionPlayFill, BsMusicNoteList } from 'react-icons/bs';

function Home() {
    return (
      <div>
        <Navbar/>
        <div className="home-banner-container">
          <div className="home-text-section">
          <div className="welcome-section">
            <h3><BsFillSearchHeartFill /> Welcome to Harmony Hunt: Musical Exploration</h3>
            <p>
              Discover the magic of musicals with Harmony Hunt, your premier destination for all things related to Broadway shows and movie musicals spectacular song and dance numbers.
            </p>

            <h4><BsMusicNoteList /> Explore Musicals Galore </h4>
            <p>
              Harmony Hunt is your gateway to a treasure trove of entertainment. Search for your favorite musicals, find new ones to love, and uncover hidden gems waiting to be enjoyed.
            </p>

            <h4> <BsHeartFill /> Find Your Favorites </h4>
            <p>
              Use our intuitive search engine to browse through a curated collection of musicals spanning decades of theatrical history. From classic Broadway hits to contemporary movie musicals.
            </p>

            <h4> <BsCollectionPlayFill /> Discover What's Trending </h4>
            <p>
              Stay in the loop with the latest buzz in the world of musicals. Our trending section showcases popular picks and must-watch recommendations, keeping you updated on the hottest musicals captivating audiences worldwide.
            </p>

            <h4><BsCardChecklist /> Create Your Watchlist </h4>
            <p>
              Personalize your musical journey by creating a watchlist of musicals you want to see or have already enjoyed. Keep track of your favorites.
            </p>
          </div>
          </div>
          <div className="home-image-section">
            <img src={LogoHH} alt="" />
          </div>
      </div>
    </div>
  );
};

export default Home;
// When you add authentication replace line 49 with 51
// export default withAuthenticator(Home);