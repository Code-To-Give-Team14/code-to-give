import React, { useRef, useState } from 'react';
import EventCard from '../components/EventCard';
import eventDataList from '../assets/stubEventList.json';
import { Button } from 'antd';

const EventPage = () => {

  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  
  const programId = "1"

  
 /** useEffect(() => {
    fetch(`https://port-0-code-to-give-m05y7f0q09864f76.sel4.cloudtype.app/admin/programs/${programId}/events`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setEvents(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setError(error);
      });
  }, [programId]); */

  const eventsRef = useRef(null);

  const scrollToEvents = () => {
    eventsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "white" }}>
      
      <div style={{ backgroundImage: "url(/events.png)", backgroundSize: "cover", width: "100%", height: "800px", backgroundPosition: "center", display: "flex", justifyContent: "center", alignItems: "end" }}>
        <Button
          ghost
          style={{
            width: "200px",
            height: "50px",
            padding: "10px",
            borderColor: "white",
            color: "white",
            fontSize: "16px",
            borderRadius: "0",
            marginBottom: "120px",
          }}
          onClick={scrollToEvents}
        >
          Click to see more
        </Button>
      </div>

      <div ref={eventsRef} style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", marginTop: "20px", backgroundColor: "white", width: "100%", paddingTop: "25px" }}>
        ### UPCOMING EVENTS ###
      </div>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", padding: "20px", backgroundColor: "white", width: "100%" }}>
        {eventDataList.map((event, index) => (
          <EventCard
            key={index}
            id={event.id}
            title={event.title}
            day={event.day}
            month={event.month}
            time={event.time}
            imageURL={event.imageURL}
            description={event.description}
          />
        ))}
      </div>

      <div style={{ padding: "30px", backgroundColor: "white", width: "100%" }}></div>

    </div>
  );
}

export default EventPage;