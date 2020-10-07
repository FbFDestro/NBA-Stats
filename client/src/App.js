import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';

const App = () => {
  return (
    <Router>
      <Route path='*' render={(routeProps) => <Header {...routeProps} />} />
    </Router>
  );
};

export default App;
