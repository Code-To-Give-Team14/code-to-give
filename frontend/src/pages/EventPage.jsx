import React from 'react'
import EventCard from '../components/EventCard'
import eventDataList from '../assets/stubEventList.json'
import { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';


const EventPage = () => {

  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  
  const programId = 1

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/admin/programs/${programId}/events`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchEvents();
  }, []);
  
  return (
    <div style={{ display: "flex", flexDirection:"column", justifyContent:"center", backgroundColor:"white"}}>
      
      <div style = {{ textAlign: "center", fontSize:"20px", fontWeight:"bold", marginTop:"20px"}}> Upcoming Events</div>

      <div style={{ display: "flex", justifyContent:"center", backgroundColor:"white", flexWrap: "wrap" }}>
        {eventDataList.map((event, index) => ( 
            <EventCard
              key = {index}
              id = {event.id}
              title = {event.title} 
              day = {event.day} 
              month = {event.month} 
              time = {event.time}
              imageURL = {event.imageURL}
              description = {event.description}
            />
        ))}
      </div>
      <div>
        {events}
      </div>
  </div>
  )
}

export default EventPage
