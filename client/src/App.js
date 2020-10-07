import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';

import InfoBox from './components/InfoBox/InfoBox';
import Teams from './components/Teams/Teams';

const App = () => {
  return (
    <Router>
      <Route path='*' render={(routeProps) => <Header {...routeProps} />} />

      <Teams />
    </Router>
  );
};

export default App;
