import React from 'react';
import axios from 'axios';
import { Form, Input, Space, Upload, DatePicker, InputNumber, Select, Button, Card, Row, Col } from 'antd';
import { InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';


export const AdminCreateEventPage = (props) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false);


    const onFinish = async (values) => {
        const [start, end] = values.date;
        const startTime = start.toISOString();
        const endTime = end.toISOString();

        const formattedValues = {
            ...values,
            startTime,
            endTime,
            types: values.types?.map((item) => item.value) ?? [],
            interests: values.interests?.map((item) => item.value) ?? [],
            skills: values.skills?.map((item) => item.value) ?? [],
        };


        try {
            setLoading(true);
            const response = await axios.post('https://port-0-code-to-give-m05y7f0q09864f76.sel4.cloudtype.app/admin/events', formattedValues);
            console.log('API response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Card>
                <Form
                    form={form}
                    name="event_form"
                    onFinish={onFinish}
                    layout="vertical"
                    style={{
                        fontSize: '16px',
                    }}
                >
                    <Row gutter={24}>
                        <Col span={16}>
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[{ required: true, message: 'Please input the event title!' }]}
                                style={{ marginBottom: '20px' }}
                            >
                                <Input size="large" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item name="programId" label="Program" rules={[{ required: true, message: 'Please input the event title!' }]}>
                                <Select style={{ width: '100%' }} size='large'>
                                    <Select.Option value={1}>Women & Girls</Select.Option>
                                    <Select.Option value={2}>Economic Opportunity</Select.Option>
                                    <Select.Option value={3}>Family Resources</Select.Option>
                                    <Select.Option value={4}>Mental Health</Select.Option>
                                    <Select.Option value={5}>Emergency Relief</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input the event description!' }]}
                        style={{ marginBottom: '20px' }}
                    >
                        <Input.TextArea rows={4} size="large" />
                    </Form.Item>

                    <Form.Item
                        name="images"
                        label="Event Images"
                        style={{ marginBottom: '20px' }}
                    >
                        <Upload.Dragger name="files" multiple size="large">
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                    </Form.Item>

                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item
                                name="types"
                                label="Types"
                                rules={[{ required: true, message: 'Please enter at least one type!' }]}
                            >
                                <Form.List name="types">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space
                                                    key={key}
                                                    style={{
                                                        display: 'flex',
                                                        marginBottom: 8,
                                                    }}
                                                    align="baseline"
                                                >
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'value']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Missing type',
                                                            },
                                                        ]}
                                                    >
                                                        <Input placeholder="Type" />
                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                                </Space>
                                            ))}

                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()} style={{ width: '100%' }} block icon={<PlusOutlined />}>
                                                    Add type
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="interests"
                                label="Interests"
                                rules={[{ required: true, message: 'Please select at least one event interest!' }]}
                            >
                                <Form.List name="interests">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space
                                                    key={key}
                                                    style={{
                                                        display: 'flex',
                                                        marginBottom: 8,
                                                    }}
                                                    align="baseline"
                                                >
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'value']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Missing interest',
                                                            },
                                                        ]}
                                                    >
                                                        <Input placeholder="Interest" />
                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                                </Space>
                                            ))}

                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()} style={{ width: '100%' }} block icon={<PlusOutlined />}>
                                                    Add interest
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                name="skills"
                                label="Skills"
                                rules={[{ required: true, message: 'Please select at least one event skill!' }]}
                            >
                                <Form.List name="skills">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space
                                                    key={key}
                                                    style={{
                                                        display: 'flex',
                                                        marginBottom: 8,
                                                    }}
                                                    align="baseline"
                                                >
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'value']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Missing skill',
                                                            },
                                                        ]}
                                                    >
                                                        <Input placeholder="Skill" />
                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                                </Space>
                                            ))}

                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()} style={{ width: '100%' }} block icon={<PlusOutlined />}>
                                                    Add skill
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={16}>
                            <Form.Item
                                name="venue"
                                label="Venue"
                                rules={[{ required: true, message: 'Please input the event venue!' }]}
                                style={{ marginBottom: '20px' }}
                            >
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="quota"
                                label="Quota"
                                rules={[{ required: true, message: 'Please input the event quota!' }]}
                                style={{ marginBottom: '20px' }}
                            >
                                <InputNumber min={0} size="large" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={16}>
                            <Form.Item
                                name="date"
                                label="Date"
                                rules={[{ required: true, message: 'Please select the event date!' }]}
                                style={{ marginBottom: '20px' }}
                            >
                                <DatePicker.RangePicker
                                    size="large"
                                    format="YYYY-MM-DD HH:mm"
                                    needConfirm={false}
                                    showTime={{
                                        defaultValue: [
                                            moment('07:00', 'HH:mm'),
                                            moment('18:00', 'HH:mm'),
                                        ],
                                    }}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="reminderTimes"
                                label="Event Reminder Times"
                                style={{ marginBottom: '20px' }}
                            >
                                <Form.List name="reminderTimes">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space
                                                    key={key}
                                                    style={{
                                                        display: 'flex',
                                                        marginBottom: 8,
                                                    }}
                                                    align="baseline"
                                                >
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'value']}
                                                        rules={[{ required: true, message: 'Please enter a value' }]}
                                                    >
                                                        <InputNumber
                                                            size="large"
                                                            placeholder="Value"
                                                            min={1}
                                                            style={{ width: '100px' }}
                                                        />
                                                    </Form.Item>

                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'unit']}
                                                        rules={[{ required: true, message: 'Please select a unit' }]}
                                                    >
                                                        <Select size="large" placeholder="Unit" style={{ width: '100px' }}>
                                                            <Select.Option value="weeks">Weeks</Select.Option>
                                                            <Select.Option value="days">Days</Select.Option>
                                                            <Select.Option value="hours">Hours</Select.Option>
                                                        </Select>
                                                    </Form.Item>

                                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                                </Space>
                                            ))}

                                            <Form.Item>
                                                <Button
                                                    size="large"
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    style={{ width: '100%' }}
                                                    block
                                                    icon={<PlusOutlined />}
                                                >
                                                    Add Reminder Time
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Form.Item>
                        </Col>
                    </Row >

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" style={{ width: '100%' }} loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
};