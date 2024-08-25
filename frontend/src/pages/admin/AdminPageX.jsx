import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts';
import { Avatar, Badge, Calendar, Card, Col, List, Row } from 'antd';
import { React } from 'react';
// import './admin/styles/style.css';

const AdminPageX = () => {
    // Fake data for the dashboard
    const data = {
        users: 1234,
        orders: 567,
        revenue: 45678.9,
        inventory: 890,
    };

    const pieParams = { height: 500, margin: { right: 5 } };

    const listData = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
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
                <Col xs={24} sm={12} md={8}>
                    <Card style={{ height: '100%' }}>
                        <Box flexGrow={1}>
                            <Typography>Default</Typography>
                            <PieChart
                                series={[{ data: [{ value: 10 }, { value: 15 }, { value: 20 }] }]}
                                {...pieParams}
                            />
                        </Box>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card style={{ height: '100%' }}>
                        <Box flexGrow={1}>
                            <Typography>Default</Typography>
                            <PieChart
                                series={[{ data: [{ value: 10 }, { value: 15 }, { value: 20 }] }]}
                                {...pieParams}
                            />
                        </Box>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card style={{ height: '100%' }}>
                        <Box flexGrow={1}>
                            <Typography>Default</Typography>
                            <PieChart
                                series={[{ data: [{ value: 10 }, { value: 15 }, { value: 20 }] }]}
                                {...pieParams}
                            />
                        </Box>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: '50px' }}>
                <Col xs={24} sm={12} md={12}>
                    <Card style={{ height: '100%' }}>
                        <Calendar cellRender={cellRender} style={{ width: '100%', height: '100%' }} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card style={{ height: '100%' }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={listData}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                        title={<a href="https://ant.design">{item.title}</a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card style={{ height: '100%' }}>
                        {/* Add your content here */}
                    </Card>
                </Col>
            </Row>
        </div>
    )
};

export default AdminPageX;