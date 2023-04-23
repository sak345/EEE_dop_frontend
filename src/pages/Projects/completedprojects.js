import React from 'react';
import Navbar from '../../components/navbar';
import ProjectHeader from '../../components/projectheader';
import Inputform from '../../components/form';
import { Breadcrumb, Layout, Menu, theme } from 'antd';


const { Header, Content, Footer } = Layout;


function CompletedProjectsPage() {
  return (
    <div>
        <Navbar/>
        <ProjectHeader/>
        <Content className="site-layout" style={{ padding: '0 50px' }}>
        
        <div style={{ padding: 24, minHeight: 380,  }}>

        </div>
      </Content>
    </div>
  );
}

export default CompletedProjectsPage;