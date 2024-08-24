import React from 'react';
import { Form, Input, Space, DatePicker, InputNumber, TimePicker, Upload, Button, Card, Row, Col } from 'antd';
import { InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { ChatBot } from '../ChatBot';

const format = 'HH:mm';

export const EventForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form:', values);
    console.log(values.duration.map((time) => time.format(format)));
  };

  return (
    <>
      <Card
        title="Event Form"
        style={{
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Form
          form={form}
          name="event_form"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            reminderTimes: dayjs('01:00', format),
            types: [
              { value: 'Type 1' },
              { value: 'Type 2' },
            ],
          }}
          style={{
            fontSize: '16px',
            padding: '30px',
          }}
        >

          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the event title!' }]}
            style={{ marginBottom: '20px' }}
          >
            <Input size="large" />
          </Form.Item>

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

          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select the event date!' }]}
            style={{ marginBottom: '20px' }}
          >
            <DatePicker size="large" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Event Duration"
            rules={[{ required: true, message: 'Please select the event duration!' }]}
            style={{ marginBottom: '20px' }}
          >
            <TimePicker.RangePicker
              format="HH:mm"
              minuteStep={15}
              showNow={false}
              needConfirm={false}
              size="large"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="venue"
            label="Venue"
            rules={[{ required: true, message: 'Please input the event venue!' }]}
            style={{ marginBottom: '20px' }}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            name="quota"
            label="Quota"
            rules={[{ required: true, message: 'Please input the event quota!' }]}
            style={{ marginBottom: '20px' }}
          >
            <InputNumber min={0} size="large" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="reminderTimes"
            label="Event Reminder Times"
            rules={[{ required: true, message: 'Please select the event reminder times!' }]}
            style={{ marginBottom: '20px' }}
          >
            <TimePicker
              value={dayjs('01:00', format)}
              defaultValue={dayjs('01:00', format)}
              format={format}
              showNow={false}
              needConfirm={false}
              size="large"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" style={{ width: '100%' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <ChatBot />
    </>
  );
};