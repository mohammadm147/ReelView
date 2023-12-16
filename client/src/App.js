import React, { useEffect } from 'react';
import styles from './style';
import { Navbar, Footer, Login, MovieDescription, Register, TVDescription } from './components';
import { Home, Profile, SearchResults, TVShows } from './pages';
import { Routes, Route } from 'react-router-dom';

// App component
function App() {
  const [signedIn, setSignedIn] = React.useState(false);


  useEffect(() => {
    const user = localStorage.getItem('userId');
    if (user) {
      setSignedIn(true);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div className={`bg-neutral-900 ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar signedIn={signedIn} setSignedIn={setSignedIn} />
        </div>
      </div>
      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home signedIn={signedIn} />} />
            <Route path="/tvshows" element={<TVShows />} />
            <Route path='/login' element={<Login setSignedIn={setSignedIn} />} />
            <Route path='/movie/:id' element={<MovieDescription />} />
            <Route path='/tv/:id' element={<TVDescription />} />
            <Route path='/register' element={<Register setSignedIn={setSignedIn} />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/search/:searchQuery' element={<SearchResults />} />
            <Route path='*'>404 Not Found</Route>
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
