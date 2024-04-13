import React from 'react';
import { NavLink } from "react-router-dom";
import { UserOutlined, } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import LogoutButton from './logout';
import styles from '../styles';
//import './navbar.css'

function Navbar() {
  return (
    <header>
      <nav style={styles.nav}>

        <ul style={styles.navb}>

          <div  >
            <NavLink to="/homepage"><button style={styles.navTitleButton}>EEE Department</button></NavLink>

          </div>

          <div style={styles.navRight}>
            <button className="button nav"><UserOutlined /> User Profile </button>
            < LogoutButton />
          </div>


        </ul>


      </nav>
    </header>

  );
}

export default Navbar;