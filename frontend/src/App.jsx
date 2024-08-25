import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { DashboardOutlined, TableOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Menu, Modal, Form, Input, Layout } from 'antd';
import './styles/NavBar.css';
import logo from './assets/Zubin-Logo.jpg'
import './App.css'
import ScrollToTop from './components/ScrollToTop';

import MainScrollPage from './pages/MainScrollPage'
import EventPage from './pages/EventPage'
import CommunityPage from './pages/CommunityPage'
import EngagementPage from './pages/EngagementPage'
import AdminPage from './pages/AdminPage'
import AdminTablePage from './pages/AdminTablePage'
import TrainingPage from './pages/TrainingPage';

import { ChatBot } from './components/ChatBot';
import { EventForm } from './components/admin/EventForm';
import { EventTable } from './components/admin/EventTable';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  // const location = useLocation();

  const showLoginModal = () => {
    setLoginModalVisible(true);
  };

  const handleLoginOk = () => {
    setIsLogin(true);
    setLoginModalVisible(false);
  };

  const handleLoginCancel = () => {
    setLoginModalVisible(false);
  };

  const handleLogout = () => {
    setIsLogin(false);
  };

  return (

    <Router>
      {!isLogin && (
        <>
          <ScrollToTop />

          <Header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 30px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
          >
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                height="60px"
              />
            </Link>
            <Menu mode="horizontal" style={{ border: 'none' }}>
              <Menu.Item key="event">
                <Link to="/event">Event</Link>
              </Menu.Item>
              <Menu.Item key="community">
                <Link to="/community">Community</Link>
              </Menu.Item>
              <Menu.Item key="engagement">
                <Link to="/engagement">Engagement</Link>
              </Menu.Item>
              <Menu.Item key="login" icon={<LoginOutlined />} onClick={showLoginModal}>
                  Login
              </Menu.Item>
            </Menu>
          </Header>

          <Modal
            title="Admin Login"
            open={loginModalVisible}
            onOk={handleLoginOk}
            onCancel={handleLoginCancel}
          >
            <Form>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input defaultValue="admin" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password defaultValue="password" />
              </Form.Item>
            </Form>
          </Modal>

          <Routes>
            <Route path="/" element={<MainScrollPage />} />
            <Route path="/event" element={<EventPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/engagement" element={<EngagementPage />} />
            <Route path=":id" element={<TrainingPage />} />
          </Routes>
        </>
      )}
      {isLogin && (
        <Layout
          style={{
            minHeight: '100vh',
          }}
        >
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div
              style={{
                height: '32px',
                margin: '16px',
                backgroundColor: 'rgba(255,255,255,.2)',
                borderRadius: '6px',
              }}
            />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
              <Menu.Item key="1" icon={<DashboardOutlined />}>
                <Link to="/">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<TableOutlined />}>
                <Link to="/table">Table</Link>
              </Menu.Item>
              <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                <Link to="/">logout</Link>
              </Menu.Item>

            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
              }}
            />
            <Content
              style={{
                margin: '0 16px',
              }}
            >
              <Breadcrumb
                style={{
                  margin: '16px 0',
                }}
              >
                <Breadcrumb.Item>Admin</Breadcrumb.Item>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              </Breadcrumb>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  // background: colorBgContainer,
                  // borderRadius: borderRadiusLG,
                }}
              >
                <Routes>
                  <Route path="/" element={<AdminPage />} />
                  <Route path="/table" element={<AdminTablePage />} />
                </Routes>
              </div>

            </Content>
          </Layout>

        </Layout>
      )}

    </Router >
  )
}

export default App