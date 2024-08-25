import { createChatBotMessage } from 'react-chatbot-kit';
import EventCard from '../EventCard';
import { useState } from 'react';
const botName = 'AiBot';
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
                                        id={event.id}
                                        title={event.title}
                                        venue = {event.venue}
                                        year = {year}
                                        month={month}
                                        day={day}
                                        hour={hour}
                                        min={min}
                                        endHour={endHour}
                                        endMin={endMin}
                                        imageURL={event.imageUrl}
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
                                        id={event.id}
                                        title={event.title}
                                        venue = {event.venue}
                                        year = {year}
                                        month={month}
                                        day={day}
                                        hour={hour}
                                        min={min}
                                        endHour={endHour}
                                        endMin={endMin}
                                        imageURL={event.imageUrl}
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

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
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
  },
  widgets: [
    {
        widgetName: 'recommendation',
        widgetFunc: (props) => <WidgetEventCard state={props.state} />,
    }
  ]
};

export default config;