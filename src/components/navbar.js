import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import LogoutButton from './logout';
import styles from '../styles';
import { Layout, Menu, Dropdown, Button, Badge } from 'antd';
import { UserOutlined, DownOutlined, BellOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

const { Header } = Layout;
//import './navbar.css'

function Navbar() {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [notifications, setNotifications] = useState([]);
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);


  useEffect(() => {
    fetchPendingAccessRequests();
  }, []);

  const fetchPendingAccessRequests = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("Token"));
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}admin/access-requests`, requestOptions);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      setPendingRequestsCount(data.pendingCount);
    } catch (error) {
      console.error('Error fetching pending access requests:', error);
    }
  };

  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}notifications`);
  //       setNotifications(response.data);
  //     } catch (error) {
  //       console.error('Error fetching notifications:', error);
  //     }
  //   };

  //   fetchNotifications();

  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 768);
  //   };

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  const notificationMenu = (
    <Menu>
      {notifications.length === 0 ? (
        <Menu.Item key="0">No notifications</Menu.Item>
      ) : (
        notifications.map(notification => (
          <Menu.Item key={notification._id} style={styles.notificationItem}>
            <div>{notification.message}</div>
            <div style={styles.notificationDate}>{new Date(notification.date).toLocaleString()}</div>
          </Menu.Item>
        ))
      )}
    </Menu>
  );

  const menu = (
    <Menu>
      {localStorage.getItem('role') === 'admin' && (
        <Menu.Item>
          <NavLink to="/addUser">Add User</NavLink>
        </Menu.Item>
      )}
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
              <Dropdown overlay={notificationMenu} trigger={['click']}>
                <Badge count={notifications.length}>
                  <Button type="link" icon={<BellOutlined />} />
                </Badge>
              </Dropdown>
              {localStorage.getItem('role') === 'admin' && (
                <>
                  <div>
                    <NavLink to="/addUser">
                      <Button type="link" className="nav">Add User</Button>
                    </NavLink>
                  </div>
                  <div>
                    <NavLink to="/admin/access-requests">
                      <Badge count={pendingRequestsCount}>
                        <Button type="link" className="nav">Access Request</Button>
                      </Badge>
                    </NavLink>
                  </div>
                </>
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