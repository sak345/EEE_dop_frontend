import React from 'react';
import { NavLink } from "react-router-dom";
import LogoutButton from './logout';
import styles from '../styles';
import { Button } from 'antd';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
//import './navbar.css'

function Navbar() {
  return (
    <header>
      <nav style={styles.nav}>

        <ul style={styles.navb}>

          <div  >
            <NavLink to="/homepage">
              <Button type="link" style={styles.navTitleButton}>EEE Department</Button>
            </NavLink>
          </div>

          <div style={styles.navRight}>
            <Button type="link" className="nav"><UserOutlined /> User Profile </Button>
            < LogoutButton />
          </div>


        </ul>


      </nav>
    </header>


  );
}

export default Navbar;