import React from 'react'
import EventCard from '../components/EventCard'
import eventDataList from '../assets/stubEventList.json'


const EventPage = () => {
  return (
    <div style={{ display: "flex", justifyContent:"center", backgroundColor:"white", flexWrap: "wrap" }}>
      
      {eventDataList.map((event, index) => (
        <EventCard
          key = {index}
          eventId = {event.id}
          title = {event.title} 
          day = {event.day} 
          month = {event.month} 
          time = {event.time}
          imageURL = {event.imageURL}
        />
      ))}
  </div>
  )
}

export default EventPage
