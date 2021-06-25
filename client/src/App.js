import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './Components/Header';
import SignUpForm from './Components/SignUpForm'
import LoginForm from './Components/LoginForm'
import Calendar from './Components/Calendar'
import Home from './Home';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

function App() {
  const [user, setUser] = useState({})
  const [form, setForm] = useState("")

  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   if(token){
  //     fetch(`http://localhost:3000/auto_login`, {
  //       headers: {
  //         "Authorization": `Bearer ${token}`
  //       }
  //     })
  //     .then(resp => resp.json())
  //     .then(data => {
  //       setUser(data)
  //        console.log(user)
  //     })
  //   }
  // }, [])

  const handleLogin = (user) => {
    setUser(user)
    handleAuthClick()
  }

  // const handleFormSwitch = (input) => {
  //   setForm(input)
  // }

  const handleAuthClick = () => {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/auto_login`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
  }

  console.log(user)

  // const renderForm = () => {
  //   switch(form){
  //     case "login":
  //       return <LoginForm handleLogin={handleLogin}/>
  //      // break;
  //     default:
  //       return <SignUpForm handleLogin={handleLogin}/>
  //   }
  // }
  

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        <Switch>
          <Route
            exact path= "/">
              <Home/>
            </Route>
            
            <Route
            exact path="/LoginForm" >
            <LoginForm
            handleLogin={handleLogin}
            />
            </Route>
            <Route
            exact path='/SignUpForm'>
            <SignUpForm
            handleLogin={handleLogin}
            />
            </Route>
            <Route
            exact path='/Calendar'>
            <Calendar user={user}/>
            </Route>
        </Switch>
        </BrowserRouter>
      </header>
    </div>
    // <div className="App">
    //     <Header handleFormSwitch={handleFormSwitch}/>
        
    //     {
    //       renderForm()
    //     }

    // </div>
  );
}

export default App;