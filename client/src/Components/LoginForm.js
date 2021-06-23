import React, {useState} from 'react'
import { Link } from "react-router-dom";
import { Button } from './Button';
//import HomePage from '../Pages/HomePage';


function LoginForm(props){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    //const history = useHistory();

    // async function handleClickEvent(event) {
    //     event.preventDefault();
      
    //     try {
    //       await Auth.signIn(email, password);
    //       userHasAuthenticated(true);
    //       history.push("/");
    //     } catch (e) {
    //       alert(e.message);
    //     }
    //   }
    const handleUsernameChange = (evt) => {
        setUsername(evt.target.value)
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }
    
    const handleSubmit = (evt) => {
        
        evt.preventDefault()
        fetch(`http://localhost:3000/users`, {
            method: "POST",

            crossDomain: true, 
            withCredentials: true,

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(resp => resp.json())
        .then(data => {
            localStorage.setItem("token", data.jwt)
            props.handleLogin(data.user)

			props.history.push("/HomePage")

        })
        setUsername("")
        setPassword("")
        
    }
    const formDivStyle = {
        margin: "auto",
        padding: "20px",
        width: "80%"
    }

	// const onSubmit = () => { 
	// 	if(userFound){
	// 	return  <Redirect  to="/home/" />


	// }}

    return(
        <div>
            <div style={formDivStyle}>
            <h1>Log In</h1>
            <form class="ui form" onSubmit={handleSubmit}>
                <div class="field">
                    <label>Username</label>
                    <input value={username} onChange={handleUsernameChange} type="text" placeholder="username"/>
                </div>
                <div class="field">
                    <label>Password</label>
                    <input value={password} onChange={handlePasswordChange} type="password" placeholder="password"/>
                </div>

                <Link to='/Calendar'>
                <button class="ui button" type="submit" >Login</button>
                </Link>
  
                <button class="ui button" type="submit" >Login</button>

            </form>
        </div>
        </div>
    )
} 
// onClick={this.onSubmit}
export default LoginForm