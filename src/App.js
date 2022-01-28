import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages/Home';
import Reports from './pages/Reports';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <Router>
        <NavBar />
      <Switch>
      <Route path= '/' exact component={Home} />
      <Route path= '/dashboard' component={Dashboard} />
      <Route path= '/reports' component={Reports} />
      </Switch>
      </Router>
    </>
  );
}

export default App;
