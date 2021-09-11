import React from 'react'
import './App.css';
import Header from './components/header/Header';
import Home from './pages/home/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Analytics from './pages/analytics/Analytics';


function App() {
  return (

    <div className="App">

      <Router>
          <Header/>
        <Switch>

          <Route exact path = "/">
            <Home/>
          </Route>

          <Route exact path = "/analytics">
            <Analytics/>
          </Route>

        </Switch>
          
      </Router>

      </div>
  );
}

export default App;
