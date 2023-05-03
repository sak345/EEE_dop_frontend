import React, {useState, useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navigate, Routes, Route } from 'react-router-dom';

import ProjectPage from './pages/Projects/projectpage';
import HomePage from './pages/homepage';
import APage from './pages/2ndpage';
import SubmittedProjectsPage from './pages/Projects/submittedprojects';
import OngoingProjectsPage from './pages/Projects/ongoingprojects';
import CompletedProjectsPage from './pages/Projects/completedprojects';
import RejectedProjectsPage from './pages/Projects/rejectedprojects';
import LogIn from './components/login';
import PrivateRoute from './components/privateRoute';

import './index.css';
import EnterProjectsPage from './pages/Projects/enterproject';
import DownloadProjectsPage from './pages/Projects/downloadprojects';

function App() {

  return (
    <BrowserRouter>

    <Routes>

    <Route path="/login" element={<LogIn/>} />
    <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>} />
    <Route path="/project" element={<PrivateRoute><ProjectPage/></PrivateRoute>} />

    <Route path="/submittedproject" element={<PrivateRoute><SubmittedProjectsPage/></PrivateRoute>} />
    <Route path="/rejectedproject" element={<PrivateRoute><RejectedProjectsPage/></PrivateRoute>} />
    <Route path="/enterproject" element={<PrivateRoute><EnterProjectsPage/></PrivateRoute>} />

    <Route path="/ongoingproject" element={<PrivateRoute><OngoingProjectsPage/></PrivateRoute>} />
    <Route path="/completedproject" element={<PrivateRoute><CompletedProjectsPage/></PrivateRoute>} />
    <Route path="/downloadproject" element={<PrivateRoute><DownloadProjectsPage/></PrivateRoute>} />


    <Route path="/a" element={<APage/>} />


    </Routes>

    </BrowserRouter>
    

  );
}
export default App;