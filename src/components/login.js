import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './login.css';

function LogIn() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false)
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('Token');
    const role = localStorage.getItem('role');

    if (token && role) {
      setLogged(true);
      toast.success("You're already logged in.");
      navigate('/homepage', { replace: true });
    }
    const params = new URLSearchParams(location.search);
    if (params.get('logout') === 'true') {
      params.delete('logout');
      toast.success('Logout Successful');
      navigate({
        pathname: location.pathname,
        search: params.toString(),
      }, { replace: true });
    }
    else if (params.get('loginRequired') === 'true') {
      params.delete('loginRequired');
      toast.error('You must be logged in first');
      navigate({
        pathname: location.pathname,
        search: params.toString(),
      }, { replace: true });
    }
    if (location.state && location.state.sessionExpired) {
      toast.error('Your session has expired.');
    }
  }, [location]);

  function getToken(user) {
    if (user) {
      const id = toast.loading('Please wait...')
      const res = axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          }
        )
        .then((res) => {
          localStorage.setItem('email', res.data.email)
          localStorage.setItem('name', res.data.name)
          localStorage.setItem('picture', res.data.picture)
          localStorage.setItem('userId', res.data.id)
          setTimeout(() => {
            localStorage.removeItem('email');
            localStorage.removeItem('name');
            localStorage.removeItem('picture');
            localStorage.removeItem('userId');
            localStorage.removeItem('Token');
            localStorage.removeItem('role');
            setLogged(false);
            // Redirect the user to the login page or refresh the page
            navigate('/', { state: { sessionExpired: true } });
          }, 60 * 1000 * 60);
          return axios.post(process.env.REACT_APP_BACKEND_URL + 'auth/login', {
            email: res.data.email,
          }, {
            headers: {
              Authorization: `Bearer ${user.access_token}`, // Include the access token in the Authorization header
            },
          })
        })
        .then((res) => {
          toast.dismiss(id)
          toast.update(id, {
            render: 'Login Succesful!',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
          })
          localStorage.setItem('Token', 'Bearer ' + res.data.token)
          localStorage.setItem('role', res.data.role)
          setLogged(true)
        })
        .catch(async (err) => {
          if (err.response && err.response.status === 401) {
            // User not authorized, create access request
            try {
              // Assuming res is defined in the try block where the Google API call is made
              const res = await axios.get(
                `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
                {
                  headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json',
                  },
                }
              );

              const myHeaders = {
                "Authorization": `Bearer ${user.access_token}`,
                "Content-Type": "application/json"
              };

              const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({
                  name: res.data.name,
                  email: res.data.email,
                }),
                redirect: "follow",
              };

              const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}admin/access-requests`, requestOptions);

              // Check if the response is OK (status code 200-299)
              if (!response.ok) {
                const errorText = await response.text(); // Read the response as text
                throw new Error(`Error: ${response.status} - ${errorText}`);
              }

              const data = await response.json();

              if (data.success) {
                toast.update(id, {
                  render: 'Access request sent. Please wait for admin approval.',
                  type: 'info',
                  isLoading: false,
                  autoClose: 5000,
                });
              } else {
                toast.update(id, {
                  render: 'Failed to send access request',
                  type: 'error',
                  isLoading: false,
                  autoClose: 3000,
                });
              }
            } catch (accessErr) {
              let errorMessage = 'Error sending access request';
              if (accessErr.response && accessErr.response.data && accessErr.response.data.message) {
                errorMessage = accessErr.response.data.message;
              } else if (accessErr.message) {
                try {
                  // Attempt to parse the nested error message
                  const parsedError = JSON.parse(accessErr.message.split(' - ')[1]);
                  if (parsedError.message) {
                    errorMessage = parsedError.message;
                  }
                } catch (parseErr) {
                  errorMessage = accessErr.message;
                }
              }
              toast.update(id, {
                render: errorMessage,
                type: 'error',
                isLoading: false,
                autoClose: 5000,
              });
              console.error('Error sending access request:', accessErr);
            }
          } else {
            toast.update(id, {
              render: err.response.data.message,
              type: 'error',
              isLoading: false,
              autoClose: 3000,
            });
            console.error('Login failed:', err);
          }
        });
    }
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => getToken(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  })

  if (logged) {
    return <Navigate to='/homepage' />
  } else {
    return (
      <div className="login-container">
        <h2>Welcome to the EEE Dept. Portal</h2>
        <button className="login-button" onClick={() => login()}>
          Sign in with Google 🚀
        </button>
      </div>
    )
  }
}
export default LogIn
