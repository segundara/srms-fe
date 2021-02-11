import React from 'react';
import './App.css';
import { Container } from "react-bootstrap";
import NavBar from "./components/nav/NavBar";
import WelcomePage from "./components/welcome/Welcome"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./components/login/Login"
import Logout from './components/logout/Logout';
import Dashboard from './components/common/Dashboard';

const App = () => {

  return (
    <Container fluid className="px-0">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={WelcomePage} />
          <Route path="/login" exact component={Login} />

          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
        <Route path="/logout" exact component={Logout} />
      </Router>
    </Container>
  );
}

export default App;
