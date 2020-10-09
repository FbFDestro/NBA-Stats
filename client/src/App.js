import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';

import Teams from './components/Teams/Teams';
import Players from './components/Players/Players';

import useLocalStorage from './hooks/useLocalStorage';
import TeamPage from './components/TeamPage/TeamPage';

const App = () => {
  const [theme, setTheme] = useLocalStorage('theme', 0);
  let root = document.documentElement;
  if (theme === 0) {
    // dark
    root.style.setProperty('--main-bg-color', '#170033');
    root.style.setProperty('--second-bg-color', '#210048');
    root.style.setProperty('--third-bg-color', '#85196a');
    root.style.setProperty('--forth-bg-color', '#531957');
    root.style.setProperty('--main-infobox-color', '#170033');
    root.style.setProperty('--main-btn-color', '#eb4939');
    root.style.setProperty('--main-btn-text-color', '#fff');
    root.style.setProperty('--main-text-color', '#fff');
    root.style.setProperty('--main-green', '#6ce365');
    root.style.setProperty('--main-red', '#e95b5b');
  } else if (theme === 1) {
    root.style.setProperty('--main-bg-color', '#000');
    root.style.setProperty('--second-bg-color', '#eee');
    root.style.setProperty('--third-bg-color', '#e4455b');
    root.style.setProperty('--forth-bg-color', '#fff');
    root.style.setProperty('--main-infobox-color', '#ddd');
    root.style.setProperty('--main-btn-color', '#2d92fa');
    root.style.setProperty('--main-btn-text-color', '#000');
    root.style.setProperty('--main-text-color', '#000');
    root.style.setProperty('--main-green', '#0ba102');
    root.style.setProperty('--main-red', '#df2020;');
  }

  return (
    <Router>
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
      </Switch>
    </Router>
  );
};

export default App;
