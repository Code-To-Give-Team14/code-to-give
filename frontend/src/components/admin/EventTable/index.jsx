import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Space, Table, Tag } from 'antd';
import { EventForm } from '../EventForm';

const dataColumns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Types',
        dataIndex: 'types',
        key: 'types',
        render: (types) => (
            <>
                {types.map((type) => (
                    <Tag color="geekblue" key={type}>
                        {type.toUpperCase()}
                    </Tag>
                ))}
            </>
        ),
    },
    {
        title: 'Interests',
        dataIndex: 'interests',
        key: 'interests',
        render: (interests) => (
            <>
                {interests.map((interest) => (
                    <Tag color="green" key={interest}>
                        {interest.toUpperCase()}
                    </Tag>
                ))}
            </>
        ),
    },
    {
        title: 'Skills',
        dataIndex: 'skills',
        key: 'skills',
        render: (skills) => (
            <>
                {skills.map((skill) => (
                    <Tag color="yellow" key={skill}>
                        {skill.toUpperCase()}
                    </Tag>
                ))}
            </>
        ),
    },
    {
        title: 'Start Time',
        dataIndex: 'startTime',
        key: 'startTime',
    },
    {
        title: 'End Time',
        dataIndex: 'endTime',
        key: 'endTime',
    },
    {
        title: 'Venue',
        dataIndex: 'venue',
        key: 'venue',
    },
    {
        title: 'Quota',
        dataIndex: 'quota',
        key: 'quota',
    },
    {
        title: 'Reminder Times',
        dataIndex: 'reminderTimes',
        key: 'reminderTimes',
        render: (reminderTimes) => (
            <>
                {reminderTimes.map((time) => (
                    <Tag color="purple" key={time}>
                        {time}
                    </Tag>
                ))}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render:
            (_, value) => (
                console.log(value),
                <Space size="middle">
                    <EventForm isRecurring initialData={value} />
                    {/* <EventForm /> */}
                </Space>
            ),
    },
];

export const EventTable = () => {
    const [data, setData] = useState([{
        "programId": 1,
        "title": "Title1",
        "description": "Description1",
        "types": [
            "type1"
        ],
        "interests": [
            "IN100"
        ],
        "skills": [
            "skill2"
        ],
        "startTime": "2024-08-25T03:00:00.540Z",
        "endTime": "2024-08-25T04:00:00.540Z",
        "venue": "Place1",
        "quota": 1000,
        "reminderTimes": [],
    }]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://port-0-code-to-give-m05y7f0q09864f76.sel4.cloudtype.app/admin/events');
                console.log('Response from "/api/events":', response.data);
                // setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return <Table columns={dataColumns} dataSource={data} />;
};