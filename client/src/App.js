import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/Header/Header';

import Teams from './components/Teams/Teams';
import Players from './components/Players/Players';

import useLocalStorage from './hooks/useLocalStorage';
import TeamPage from './components/TeamPage/TeamPage';
import PlayerPage from './components/PlayerPage/PlayerPage';
import ComparePlayers from './components/ComparePlayers/ComparePlayers';
import { setDarkTheme, setLightTheme } from './manageThemes';
import CompareTeams from './components/CompareTeams/CompareTeams';

const App = () => {
  const [theme, setTheme] = useLocalStorage('theme', 0);
  if (theme === 0) setDarkTheme();
  else if (theme === 1) setLightTheme();

  return (
    <Router>
      <div id='content'>
        <Route path='*'>
          <Header theme={theme} setTheme={setTheme} />
        </Route>

        <Switch>
          <Route exact path='/'>
            <Redirect to='/teams'></Redirect>
          </Route>
          <Route path='/teams'>
            <Teams />
          </Route>
          <Route path='/team/:team_id'>
            <TeamPage />
          </Route>
          <Route path='/players'>
            <Players />
          </Route>
          <Route path='/player/:player_id'>
            <PlayerPage />
          </Route>

          <Route path='/comparePlayers'>
            <ComparePlayers />
          </Route>
          <Route path='/compareTeams'>
            <CompareTeams />
          </Route>

          <Route path='*'>
            <h1>Page not found :(</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
