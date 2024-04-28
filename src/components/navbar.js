import React from 'react';
import { NavLink } from "react-router-dom";
import LogoutButton from './logout';
import styles from '../styles';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

const { Header } = Layout;
//import './navbar.css'

function Navbar() {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  const menu = (
    <Menu>
      {localStorage.getItem('role') === 'admin' && (
        <Menu.Item>
          <NavLink to="/addUser">Add User</NavLink>
        </Menu.Item>
      )}
      <Menu.Item>
        <NavLink to="/profile"><UserOutlined /> User Profile</NavLink>
      </Menu.Item>
      <Menu.Item>
        <LogoutButton />
      </Menu.Item>
    </Menu>
  );

  return (
    <header>
      <nav style={styles.nav}>

        <ul style={styles.navb}>

          <div  >
            <NavLink to="/homepage">
              <Button type="link" style={styles.navTitleButton}>EEE Department</Button>
            </NavLink>
          </div>

          {isMobile ? (
            <div style={styles.navRight}>
              <Dropdown overlay={menu}>
                <Button>
                  Menu <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          ) : (
            <div style={styles.navRight}>
              {localStorage.getItem('role') === 'admin' && (
                <NavLink to="/addUser">
                  <Button type="link" className="nav">Add User</Button>
                </NavLink>
              )}
              <LogoutButton />
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;