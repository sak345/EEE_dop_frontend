import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import ProjectPage from './pages/Projects/projectpage'
import HomePage from './pages/homepage'
import AllJournals from './pages/Journals/allJournals'
import SubmittedProjectsPage from './pages/Projects/submittedprojects'
import OngoingProjectsPage from './pages/Projects/ongoingprojects'
import CompletedProjectsPage from './pages/Projects/completedprojects'
import RejectedProjectsPage from './pages/Projects/rejectedprojects'
import LogIn from './components/login'
import PrivateRoute from './components/privateRoute'
import './index.css'
import EnterProjectsPage from './pages/Projects/enterproject'
import DownloadProjectsPage from './pages/Projects/downloadprojects'
import NotFoundPage from './pages/NotFoundPage';
import AddUser from './pages/AddUser';
import AllAwards from './pages/Awards'
import AllGuestLectures from './pages/GuestLectures'
import AdminAccessRequests from './pages/AdminAccessRequests'
import AdminRoute from './components/adminRoute';


function App() {
  // const [isAdmin, setIsAdmin] = useState(false)

  // useEffect(() => {
  //   let confi = {
  //     method: 'get',
  //     maxBodyLength: Infinity,
  //     url: process.env.REACT_APP_BACKEND_URL + 'user/me',
  //     headers: {
  //       Authorization: localStorage.getItem('Token'),
  //     },
  //   }
  //   // Make a GET request to the server to get the user's role
  //   axios
  //     .get(confi)
  //     .then((response) => {
  //       const { role } = response.data

  //       // If the user is an admin, set the state to true
  //       if (role === 'admin') {
  //         setIsAdmin(true)
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // }, [])


  return (
    <BrowserRouter >
      <ToastContainer />
      <Routes>
        <Route path='/homepage' element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route
          path='/'
          element={
            <LogIn />
          }
        />
        <Route path="/addUser" element={
          <AdminRoute>
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          </AdminRoute>
        } />
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

        <Route path='/journals' element={<PrivateRoute><AllJournals /></PrivateRoute>} />
        <Route path='/awards' element={<PrivateRoute><AllAwards /></PrivateRoute>} />
        <Route path='/guestlectures' element={<PrivateRoute><AllGuestLectures /></PrivateRoute>} />
        <Route path="/admin/access-requests" element={<AdminRoute><PrivateRoute><AdminAccessRequests /></PrivateRoute></AdminRoute>} />
        <Route path='*' element={<PrivateRoute><NotFoundPage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
