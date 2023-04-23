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
                        <NavLink to="/submittedproject"><button className="button nav">Submitted Projects</button></NavLink>
                    </li>
                    <li>
                        <NavLink to="/ongoingproject"><button className="button nav">Ongoing Projects</button></NavLink>
                    </li>
                    <li style={styles.lastChild}>
                        <NavLink to="/completedproject"><button className="button nav">Completed Projects</button></NavLink>
                    </li>
                </ul>
            
            </nav>
        </header>
    );
  }
  
  export default ProjectHeader;