import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Navigate, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from 'react-toastify';
import ProjectPage from './pages/Projects/projectpage'
import HomePage from './pages/homepage'
import AllJournals from './pages/Journals/allJournals'
import AddJournals from './pages/Journals/addJournals'
import SubmittedProjectsPage from './pages/Projects/submittedprojects'
import OngoingProjectsPage from './pages/Projects/ongoingprojects'
import CompletedProjectsPage from './pages/Projects/completedprojects'
import RejectedProjectsPage from './pages/Projects/rejectedprojects'
import LogIn from './components/login'
import PrivateRoute from './components/privateRoute'
import './index.css'
import EnterProjectsPage from './pages/Projects/enterproject'
import DownloadProjectsPage from './pages/Projects/downloadprojects'

function App() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    let confi = {
      method: 'get',
      maxBodyLength: Infinity,
      url: process.env.REACT_APP_BACKEND_URL + 'user/me',
      headers: {
        Authorization: localStorage.getItem('Token'),
      },
    }
    // Make a GET request to the server to get the user's role
    axios
      .get(confi)
      .then((response) => {
        const { role } = response.data

        // If the user is an admin, set the state to true
        if (role === 'admin') {
          setIsAdmin(true)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])


  return (
    <BrowserRouter >
      <ToastContainer />
      <Routes>
        <Route path='/homepage' element={<HomePage />} />
        <Route
          path='/'
          element={
            <LogIn />
          }
        />
        <Route
          path='/project'
          element={
            <PrivateRoute>
              <ProjectPage />
            </PrivateRoute>
          }
        />

        <Route
          path='/submittedproject'
          element={
            <PrivateRoute>
              <SubmittedProjectsPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/rejectedproject'
          element={
            <PrivateRoute>
              <RejectedProjectsPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/enterproject'
          element={
            <PrivateRoute>
              <EnterProjectsPage />
            </PrivateRoute>
          }
        />

        <Route
          path='/ongoingproject'
          element={
            <PrivateRoute>
              <OngoingProjectsPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/completedproject'
          element={
            <PrivateRoute>
              <CompletedProjectsPage />
            </PrivateRoute>
          }
        />
        <Route path="/downloadproject" element={<PrivateRoute><DownloadProjectsPage /></PrivateRoute>} />

        <Route path='/journals' element={<AllJournals />} />
        <Route path='/journals/add' element={<AddJournals />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
