import React, {useState, useEffect} from 'react';
import Inputform from '../../components/form';
import PopUpButton from '../../components/popup';
import Navbar from '../../components/navbar';
import ProjectHeader from '../../components/projectheader';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import axios from 'axios';

const { Header, Content, Footer } = Layout;

function SubmittedProjectsPage() {

  return (
    <div>
       <Navbar/>
       <ProjectHeader/>

       <Content className="site-layout" style={{ padding: '0 50px' }}>
        
        <div style={{ padding: 24, minHeight: 380,  }}>
        <Inputform/>  
        </div>
      </Content>
           
    </div>
  );
}

export default SubmittedProjectsPage;