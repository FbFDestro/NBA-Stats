import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';

import Teams from './components/Teams/Teams';
import Players from './components/Players/Players';

const App = () => {
  return (
    <Router>
      <Route path='*'>
        <Header />
      </Route>

      <Switch>
        <Route exact path='/'>
          <Redirect to='/teams'></Redirect>
        </Route>
        <Route path='/teams'>
          <Teams />
        </Route>
        <Route path='/players'>
          <Players />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
