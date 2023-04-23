import React from 'react';
import { Link } from 'react-router-dom';
import ProjectHeader from '../../components/projectheader';
import Navbar from '../../components/navbar'; 

function ProjectPage() {
  return (
    <div>
      <Navbar/>
      <ProjectHeader/>
      
      <p>This is an empty template for your project page.</p>

      {/* <Link to="/submittedproject"><button>Submitted Projects</button></Link>
      <Link to="/ongoingproject"><button>Ongoing Projects</button></Link>
      <Link to="/completedproject"><button>Completed Projects</button></Link> */}

    </div>
  );
}

export default ProjectPage;