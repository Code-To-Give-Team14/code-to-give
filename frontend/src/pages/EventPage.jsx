import React from 'react'
import EventCard from '../components/EventCard'
import eventDataList from '../assets/stubEventList.json'
import { Tabs } from 'antd';


const EventPage = () => {
  
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
  </div>
  )
}

export default EventPage
