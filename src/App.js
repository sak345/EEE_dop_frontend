import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router, Routes, Route } from 'react-router-dom';

import ProjectPage from './pages/Projects/projectpage';
import HomePage from './pages/homepage';
import APage from './pages/2ndpage';
import SubmittedProjectsPage from './pages/Projects/submittedprojects';
import OngoingProjectsPage from './pages/Projects/ongoingprojects';
import CompletedProjectsPage from './pages/Projects/completedprojects';

import './index.css';


function App() {
  return (

    <BrowserRouter>

    <Routes>

    <Route path="/" element={<HomePage/>} />
    <Route path="/project" element={<ProjectPage/>} />
    <Route path="/submittedproject" element={<SubmittedProjectsPage/>} />
    <Route path="/ongoingproject" element={<OngoingProjectsPage/>} />
    <Route path="/completedproject" element={<CompletedProjectsPage/>} />


    <Route path="/a" element={<APage/>} />


    </Routes>

    </BrowserRouter>

  );
}
export default App;