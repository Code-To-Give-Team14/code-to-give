import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import '../styles/SideBar.css';

const SideBar = () => {
    return (
      <Layout>
        <Layout.Sider width={200} style={{ minHeight: '100vh' }}>
          <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="1">
              <Link to="/admin">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/admin/table">Events</Link>
            </Menu.Item>
          </Menu>
        </Layout.Sider>
      </Layout>
    );
  };
  
  export default SideBar;