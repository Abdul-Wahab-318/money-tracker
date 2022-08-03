import React , { useEffect }from 'react'
import './App.css';
import Header from './components/header/Header';
import Home from './pages/home/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Analytics from './pages/analytics/Analytics';
import Register from './pages/register/Register';
import { useSaveUser } from './hooks/useSaveUser';
import { useSelector } from 'react-redux';
import URL from './api';

function App() {

  let [ user , setUser ] = useSaveUser({})
  let userStatus = useSelector( state => state.userReducer._id ) //written here because it re renders app when redux user state changes

  let fetchUser = async () => {

    try{

      await fetch(`${URL}/user/userProfile` , { credentials : "include" }).then( data => data.json() ).then( response => {

        if( !response.ok )
        return 

        setUser({ type : "SAVE_USER_INFO" , payload : response.user })
        let { budget } = response.user
        localStorage.setItem("budget" , JSON.stringify(budget) )
        console.log("got the budget : " , budget)
      })

    }
    catch(err)
    {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUser()
  } , [] )

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

          <Route exact path = "/register">
            <Register/>
          </Route>

        </Switch>
          
      </Router>

      </div>
  );
}

export default App;
