//import ProjectPage from './components/projectpage';
import React from 'react';
//import HomePage from './components/homepage';
import { Route } from 'react-router-dom';

import Allmeetupspage from './pages/AllMeetup';
import Newmeetupspage from './pages/NewMeetups';
import Favoritespage from './pages/Favorites';


function App() {
  return (
    <div>
      <Route path='/'> 
      <Allmeetupspage/>
      </Route>

      <Route path='/new-meetup'> 
      <Newmeetupspage/>
      </Route>

      <Route path='/favorite'> 
      <Favoritespage/>
      </Route>
    </div>

  );
}
export default App;