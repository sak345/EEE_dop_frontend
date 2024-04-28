import React, {useState, useEffect} from 'react';
import Inputform from '../../components/form';
import PopUpButton from '../../components/popup';
import Navbar from '../../components/navbar';
import ProjectHeader from '../../components/projectheader';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import styles from '../../styles';

const { Header, Content, Footer } = Layout;

function EnterProjectsPage() {

    const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {

    let confi = {
      method: 'get',
      maxBodyLength: Infinity,
      url: process.env.REACT_APP_BACKEND_URL+'user/me',
      headers: { 
        'Authorization': localStorage.getItem('Token')
      },
    };
    // Make a GET request to the server to get the user's role
    axios.get(confi).then((response) => {
      const { role } = response.data;

      // If the user is an admin, set the state to true
      if (role === 'admin') {
        setIsAdmin(true);
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  if(isAdmin)
  {
    return (
        <div>
           <Navbar/>
           {/* <ProjectHeader/> */}
           <header >
                <h1 style={styles.pageTitle}>Projects</h1>
    
                <nav style={styles.nav}>
                    <ul style={styles.navContainer}>
                        <li style={styles.firstChild}>
                            <NavLink to="/enterproject"><button className="button-nav-1">Enter Project</button></NavLink>
                        </li>
                        <li>
                            <NavLink to="/project"><button className="button-nav">All Projects</button></NavLink>
                        </li>
                        <li>
                            <NavLink to="/submittedproject"><button className="button-nav">Submitted Projects</button></NavLink>
                        </li>
                        <li>
                            <NavLink to="/rejectedproject"><button className="button-nav">Rejected Projects</button></NavLink>
                        </li>
                        <li>
                            <NavLink to="/ongoingproject"><button className="button-nav">Ongoing Projects</button></NavLink>
                        </li>
                        <li>
                            <NavLink to="/completedproject"><button className="button-nav">Completed Projects</button></NavLink>
                        </li>
                        <li style={styles.lastChild}>
                            <NavLink to="/downloadproject"><button className="button-nav">Download Projects</button></NavLink>
                        </li>
                    </ul>
                
                </nav>
            </header>
    
           <Content className="site-layout" style={{ padding: '0 50px' }}>
            
            <div style={{ padding: 24, minHeight: 380,  }}>
            <Inputform/>  
            </div>
          </Content>
               
        </div>
      );
  }

  return (
    <div>
       <Navbar/>
       {/* <ProjectHeader/> */}
       <header >
            <h1 style={styles.pageTitle}>Projects</h1>

            <nav style={styles.nav}>
                <ul style={styles.navContainer}>
                    <li style={styles.firstChild}>
                        <NavLink to="/enterproject"><button className="button-nav-1">Enter Project</button></NavLink>
                    </li>
                    <li>
                        <NavLink to="/project"><button className="button-nav">All Projects</button></NavLink>
                    </li>
                    <li>
                        <NavLink to="/submittedproject"><button className="button-nav">Submitted Projects</button></NavLink>
                    </li>
                    <li>
                        <NavLink to="/rejectedproject"><button className="button-nav">Rejected Projects</button></NavLink>
                    </li>
                    <li>
                        <NavLink to="/ongoingproject"><button className="button-nav">Ongoing Projects</button></NavLink>
                    </li>
                    <li style={styles.lastChild}>
                        <NavLink to="/completedproject"><button className="button-nav">Completed Projects</button></NavLink>
                    </li>
                    {/* <li style={styles.lastChild}>
                        <NavLink to="/downloadproject"><button className="button-nav">Download Projects</button></NavLink>
                    </li> */}
                </ul>
            
            </nav>
        </header>

       <Content className="site-layout" style={{ padding: '0 50px' }}>
        
        <div style={{ padding: 24, minHeight: 380,  }}>
        <Inputform/>  
        </div>
      </Content>
           
    </div>
  );
}

export default EnterProjectsPage;