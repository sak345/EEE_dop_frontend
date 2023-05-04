import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';;

function LogIn() {
    const [logged, setLogged] = useState(false)
    function getToken(user){
        if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        localStorage.setItem("email", res.data.email);
                        localStorage.setItem("name", res.data.name);
                        localStorage.setItem("picture", res.data.picture);
                        console.log(process.env.REACT_APP_BACKEND_URL+"auth/login")
                        console.log(res.data.email);
                        return axios
                            .post(process.env.REACT_APP_BACKEND_URL+"auth/login", {
                                email: res.data.email
                            })
                        
                    })
                    .then((res) => {
                        localStorage.setItem("Token", 'Bearer ' + res.data.token); 
                        console.log("Login successful")
                        setLogged(true)
                        
                    })
                    .catch((err) => console.log(err));
            }
    }

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => getToken(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const logOut = () => {
        googleLogout();
        localStorage.removeItem("Token")
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("picture");
        console.log("logout successful")
    };

   if (logged) {
    return <Navigate to="/" />
   } else {
        return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            <button onClick={() => login()}>Sign in with Google 🚀 </button>
            <button onClick={logOut}>Log out</button>

        </div>
        )
   }

}
export default LogIn;