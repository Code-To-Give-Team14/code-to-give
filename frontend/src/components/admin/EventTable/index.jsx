import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Space, Table, Tag } from 'antd';
import { EventForm } from '../EventForm';

const dataColumns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        align: 'right',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        align: 'right',
    },
    {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
        align: 'right',
    },
    {
        title: 'Venue',
        dataIndex: 'venue',
        key: 'venue',
        align: 'right',
    },
    {
        title: 'Quota',
        dataIndex: 'quota',
        key: 'quota',
    },

    {
        title: 'Types',
        dataIndex: 'types',
        key: 'types',
        render: (types) => (
            <>
                {types.length > 0 ? (
                    types.map((type) => (
                        <Tag color="geekblue" key={type}>
                            {type.toUpperCase()}
                        </Tag>
                    ))
                ) : (
                    <Tag color="red" key="empty"></Tag>
                )}
            </>
        ),
    },
    {
        title: 'Interests',
        dataIndex: 'interests',
        key: 'interests',
        render: (interests) => (
            <>
                {interests.length > 0 ? (
                    interests.map((interest) => (
                        <Tag color="green" key={interest}>
                            {interest.toUpperCase()}
                        </Tag>
                    ))
                ) : (
                    <Tag color="red" key="empty"></Tag>
                )}
            </>
        ),
    },
    {
        title: 'Skills',
        dataIndex: 'skills',
        key: 'skills',
        render: (skills) => (
            <>
                {skills.length > 0 ? (
                    skills.map((skill) => (
                        <Tag color="yellow" key={skill}>
                            {skill.toUpperCase()}
                        </Tag>
                    ))
                ) : (
                    <Tag color="red" key="empty"></Tag>
                )}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render:
            (_, value) => (
                <Space size="middle">
                    <EventForm isEdit initialData={value} />
                    <EventForm isRecurring initialData={value} />
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
        "date": "2024-08-25",
        "duration": "03:00-04:00",
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
                const updatedData = response.data.map(event => {
                    const sDate = new Date(event.startTime);
                    const eDate = new Date(event.endTime);
                    const date = `${sDate.getFullYear()}-${sDate.getMonth() + 1}-${sDate.getDate()}`;
                    const startHours = sDate.getHours();
                    const startMinutes = sDate.getMinutes().toString().padStart(2, '0');
                    const endHours = eDate.getHours();
                    const endMinutes = eDate.getMinutes().toString().padStart(2, '0');
                    const duration = `${startHours}:${startMinutes}-${endHours}:${endMinutes}`;
                    return {
                        date,
                        duration,
                        ...event
                    };
                });
                setData(updatedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return <Table columns={dataColumns} dataSource={data} />;
};