import React from 'react';
import Inputform from '../../components/form';
import Navbar from '../../components/navbar';
import ProjectHeader from '../../components/projectheader';


function SubmittedProjectsPage() {
  return (
    <div>
        <ProjectHeader/>
      <h1>Submitted Projects</h1>
      <Inputform/>      
    </div>
  );
}

export default SubmittedProjectsPage;