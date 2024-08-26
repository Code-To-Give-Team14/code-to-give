import { createChatBotMessage } from 'react-chatbot-kit';
import { Card, Col, Row } from 'antd';
import EventCard from '../EventCard';
import { useState } from 'react';
const botName = 'ChatBot';
const monthMap = {
    '01': 'JAN',
    '02': 'FEB',
    '03': 'MAR',
    '04': 'APR',
    '05': 'MAY',
    '06': 'JUN',
    '07': 'JUL',
    '08': 'AUG',
    '09': 'SEP',
    '10': 'OCT',
    '11': 'NOV',
    '12': 'DEC'
};

const WidgetEventCard = (props) => {
    const [eventForUserToJoinAsMember,] = useState(props.state.eventForUserToJoinAsMember);
    const [eventForUserToJoinAsVolunteer,] = useState(props.state.eventForUserToJoinAsVolunteer);
    return (
        <div>
            {
                eventForUserToJoinAsMember.length > 0 && (
                    <div>
                        <h3>Event Recommended for You To Join as Participant</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {eventForUserToJoinAsMember.map((event, index) => {
                                const date = new Date(event.startTime);
                                const year = date.getFullYear();
                                const month = monthMap[date.toISOString().slice(5, 7)];
                                const day = String(date.getDate()).padStart(2, '0');
                                const hour = String(date.getHours()).padStart(2, '0');
                                const min = String(date.getMinutes()).padStart(2, '0');

                                const endDate = new Date(event.endTime);
                                const endHour = String(endDate.getHours()).padStart(2, '0');
                                const endMin = String(endDate.getMinutes()).padStart(2, '0');
                    
                                return (
                                    <EventCard
                                        key={index}
                                        id={event.eventId}
                                        title={event.title}
                                        venue = {event.venue}
                                        year = {year}
                                        month={month}
                                        day={day}
                                        hour={hour}
                                        min={min}
                                        endHour={endHour}
                                        endMin={endMin}
                                        interests={event.interests}
                                        skills={event.skills}
                                        imgUrl={event.imgUrl}
                                        description={event.description}
                                    />
                                )
                            })}
                        </div>
                    </div>
                )
            }
            {
                eventForUserToJoinAsVolunteer.length > 0 && (
                    <div>
                        <h3>Event Recommended for You To Join as Volunteer</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {eventForUserToJoinAsVolunteer.map((event, index) => {
                                const date = new Date(event.startTime);
                                const year = date.getFullYear();
                                const month = monthMap[date.toISOString().slice(5, 7)];
                                const day = String(date.getDate()).padStart(2, '0');
                                const hour = String(date.getHours()).padStart(2, '0');
                                const min = String(date.getMinutes()).padStart(2, '0');

                                const endDate = new Date(event.endTime);
                                const endHour = String(endDate.getHours()).padStart(2, '0');
                                const endMin = String(endDate.getMinutes()).padStart(2, '0');
                    
                                return (
                                    <EventCard
                                        key={index}
                                        id={event.eventId}
                                        title={event.title}
                                        venue = {event.venue}
                                        year = {year}
                                        month={month}
                                        day={day}
                                        hour={hour}
                                        min={min}
                                        endHour={endHour}
                                        endMin={endMin}
                                        interests={event.interests}
                                        skills={event.skills}
                                        imgUrl={event.imgUrl}
                                        description={event.description}
                                    />
                                )
                            })}
                        </div>
                    </div>
                )
            }
        </div>
    );
}

const WidgetNewInterestsOrSkills = (props) => {
    const [newInterests,] = useState(props.state.newInterests);
    const [newSkills,] = useState(props.state.newSkills);
    return (
        <div>
            {newInterests.length > 0 && (<Card bodyStyle={{ padding: '10px' }}>
                <h3 style={{ margin: '5px 10px' }}>Interests Added</h3>
                <ul style={{ margin: '10px 0' }}>
                    {newInterests.map((interest, index) => <li key={index}>{interest}</li>)}
                </ul>
            </Card>)}
            {newInterests.length > 0 && newSkills.length > 0 && <div style={{ height: '20px' }}></div>}
            {newSkills.length > 0 && (<Card bodyStyle={{ padding: '10px' }}>
                <h3 style={{ margin: '5px 10px' }}>Skills Added</h3>
                <ul style={{ margin: '10px 0' }}>
                    {newSkills.map((skill, index) => <li key={index}>{skill}</li>)}
                </ul>
            </Card>)}
        </div>
    );
}

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm your helpful chatbot assistant on the Zubin Foundation website. How can I help you today?`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
  state: {
    eventForUserToJoinAsMember: [],
    eventForUserToJoinAsVolunteer: [],
    newInterests: [],
    newSkills: [],
  },
  widgets: [
    {
        widgetName: 'recommendation',
        widgetFunc: (props) => <WidgetEventCard state={props.state} />,
    },
    {
        widgetName: 'newInterestsOrSkills',
        widgetFunc: (props) => <WidgetNewInterestsOrSkills state={props.state} />,
    }
  ]
};

export default config;