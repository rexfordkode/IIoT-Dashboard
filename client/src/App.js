import React from 'react';
import  './App.css';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import {TestConnection} from './pages/TestConnection';

function App() {
  return (
    <>
      <Router>
      <NavBar />
      <Switch>
        <Route path= '/' exact component={Home} />
        <Route path= '/dashboard' component={Dashboard} />
        <Route path= '/testconnection' component={TestConnection} />
      </Switch>
      </Router>
    </>
  );
}

export default App;
