import React from 'react';
import { Link } from 'react-router-dom';
import Homegrid from '../components/grid';
import Navbar from '../components/navbar';
import ProjectPage from './Projects/projectpage';

function HomePage (){
  return (
    <div>
      <h1>EEE Department</h1>

      <Link to="/project"><button>Project</button></Link>
      <Link to="/a"><button>A</button></Link>
      <Link to="/b"><button>B</button></Link>
      <Link to="/c"><button>C</button></Link>
      <Link to="/d"><button>D</button></Link>
      <Link to="/e"><button>E</button></Link>
      <Link to="/f"><button>F</button></Link>
      <Link to="/g"><button>G</button></Link>
    
    </div>
  );
}

export default HomePage;