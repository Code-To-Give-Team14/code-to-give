import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PieChart, BarChart, LineChart } from '@mui/x-charts';
import { Avatar, Badge, Calendar, Card, Col, List, Row, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { React } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  // Fake data for the dashboard
  const data = {
    users: 1234,
    orders: 567,
    revenue: 45678.9,
    inventory: 890,
  };

  const [weatherWarning, setWeatherWarning] = useState('');

  useEffect(() => {
    const fetchWeatherWarning = async () => {
      try {
        const response = await axios.get('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warningInfo&lang=en');
        setWeatherWarning(response.data.details[0].contents[0]);
      } catch (error) {
        console.error('Error fetching weather warnings:', error);
        setWeatherWarning('Failed to fetch weather warnings');
      }
    };

    fetchWeatherWarning();
  }, []);

  useEffect(() => {
    if (weatherWarning) {
      notification.open({
        message: 'Weather Warnings',
        description: weatherWarning,
        duration: 3,
        showProgress: true,
        icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
      });
    }
  }, [weatherWarning]);


  const pieParams = { height: 500, margin: { right: 5 } };

  const listData = [
    {
      title: 'Arjun Singh',
      feedback: 'Excellent service and support. The team was very responsive and went above and beyond to ensure satisfaction.',
    },
    {
      title: 'Edison Chan',
      feedback: 'Very satisfied with the experience. The process was smooth, and the results exceeded my expectations.',
    },
    {
      title: 'Rajesh Gupta',
      feedback: 'Good overall, but there is room for improvement in certain areas such as timeliness and communication.',
    },
    {
      title: 'Anthony So',
      feedback: 'Amazing attention to detail. Every aspect was handled professionally, making it a memorable experience.',
    },
    {
      title: 'Deepak Chatterjee',
      feedback: 'Overall experience is positive. The support provided was helpful and addressed all my queries effectively.',
    },
    {
      title: 'Leung Chek Ho',
      feedback: 'Satisfied with the quick response and the effort put into resolving issues promptly and efficiently.',
    },
  ];

  const getListData = (value) => {
    let listData = []; // Specify the type of listData
    switch (value.date()) {
      case 1:
        listData = [
          {
            type: 'warning',
            content: 'warning event',
          }
        ];
        break;
      case 8:
        listData = [
          {
            type: 'warning',
            content: 'warning event',
          }
        ];
        break;
      case 10:
        listData = [
          {
            type: 'success',
            content: 'This is usual event.',
          },
        ];
        break;
      case 15:
        listData = [
          {
            type: 'error',
            content: 'This is error event.',
          },
        ];
        break;
      default:
    }
    return listData || [];
  };
  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return (

    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8} md={6}>
          <Card style={{ height: '300px' }}> {/* Adjusted height */}
            <Box flexGrow={1}>
              <Typography><div style={{ fontWeight: "bold" }}>Most Popular Event</div></Typography>
              <PieChart
                series={[{ data: [{ value: 10 }, { value: 15 }, { value: 20 }] }]}
                {...pieParams}
                height={200} // Adjusted chart height
              />
            </Box>
          </Card>
        </Col>
        <Col xs={24} sm={16} md={9}>
          <Card style={{ height: '300px' }}> {/* Adjusted height */}
            <Box flexGrow={1}>
              <Typography> <div style={{ fontWeight: "bold" }}>Number of Volunteers</div></Typography>
              <BarChart
                series={[
                  { data: [35, 44, 24, 34] },
                  { data: [51, 6, 49, 30] },
                  { data: [15, 25, 30, 50] },
                  { data: [60, 50, 15, 25] },
                ]}
                height={200} // Adjusted chart height
                xAxis={[{ data: ['Chai', 'Clay', 'Plant', 'Gathering'], scaleType: 'band' }]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              />
            </Box>
          </Card>
        </Col>
        <Col xs={24} sm={16} md={9}>
          <Card style={{ height: '300px' }}> {/* Adjusted height */}
            <Box flexGrow={1}>
              <Typography> <div style={{ fontWeight: "bold" }}>Donation Tracking</div></Typography>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                    area: true,
                  },
                ]}
                width={470}
                height={200} // Adjusted chart height
              />
            </Box>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '50px' }}>
        <Col xs={24} sm={16} md={16}>
          <Card style={{ height: '100%' }}>
            <Calendar cellRender={cellRender} style={{ width: '100%', height: '100%' }} />
          </Card>
        </Col>
        <Col xs={24} sm={8} md={8}>
          <Card style={{ height: '100%' }}>
            <div>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>Satisfaction Feedbacks</div>
              <List
                itemLayout="horizontal"
                dataSource={listData}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                      title={<a href="https://ant.design">{item.title}</a>}
                      description={`${item.feedback}`}
                    />
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
};

export default AdminPage;