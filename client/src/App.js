import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';

import Teams from './components/Teams/Teams';

const App = () => {
  return (
    <Router>
      <Route path='*'>
        <Header />
      </Route>

      <Switch>
        <Route exact path='/teams' render={() => <Teams />} />
      </Switch>
    </Router>
  );
};

export default App;
