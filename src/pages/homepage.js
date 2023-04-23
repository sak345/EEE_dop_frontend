import React from 'react';
import { Link } from 'react-router-dom';
import Homegrid from '../components/grid';
import Navbar from '../components/navbar';
import ProjectPage from './Projects/projectpage';
import styles from '../styles';
import './homepage.css';


function HomePage (){
  return (
    <div>
      <Navbar/>

      <div style={styles.homeContainer} >
      <Link to="/project"><button className="button home"> Project</button></Link>
      <Link to="/a"><button className="button home">A</button></Link>
      <Link to="/b"><button className="button home">B</button></Link>
      <Link to="/c"><button className="button home">C</button></Link>
      
      <Link to="/d"><button className="button home">D</button></Link>
      <Link to="/e"><button className="button home">E</button></Link>
      <Link to="/f"><button className="button home">F</button></Link>
      <Link to="/g"><button className="button home">G</button></Link>
      </div>
      
    </div>
  );
}

export default HomePage;