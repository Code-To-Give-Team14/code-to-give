import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
    <Router>
      <Layout>
        <Layout.Sider width={200} style={{ minHeight: '100vh' }}>
          <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="1">
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/events">Events</Link>
            </Menu.Item>
          </Menu>
        </Layout.Sider>
      </Layout>
    </Router>
    );
  };
  
  export default Sidebar;