import React from 'react';
import { NavLink } from "react-router-dom";
import styles from '../styles';
import './projectheader.css';


function ProjectHeader() {
    return (
        <header >
            <h1 style={styles.pageTitle}>Projects</h1>

            <nav style={styles.nav}>
                <ul style={styles.navContainer}>
                    <li style={styles.firstChild}>
                        <NavLink to="/enterproject"><button className="button nav">Enter Project</button></NavLink>
                    </li>
                    <li>
                        <NavLink to="/project"><button className="button nav">All Projects</button></NavLink>
                    </li>
                    <li>
                        <NavLink to="/submittedproject"><button className="button nav">Submitted Projects</button></NavLink>
                    </li>
                    <li>
                        <NavLink to="/rejectedproject"><button className="button nav">Rejected Projects</button></NavLink>
                    </li>
                    <li>
                        <NavLink to="/ongoingproject"><button className="button nav">Ongoing Projects</button></NavLink>
                    </li>
                    <li>
                        <NavLink to="/completedproject"><button className="button nav">Completed Projects</button></NavLink>
                    </li>
                    <li style={styles.lastChild}>
                        <NavLink to="/downloadproject"><button className="button nav">Downld Projects</button></NavLink>
                    </li>
                </ul>
            
            </nav>
        </header>
    );
  }
  
  export default ProjectHeader;