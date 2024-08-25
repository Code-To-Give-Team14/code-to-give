import React, { useRef, useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import eventDataList from '../assets/stubEventList.json';
import { Button, Tabs } from 'antd';
import { ChatBot } from '../components/ChatBot';

const EventPage = () => {

  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [programId, setProgramId] = useState(3)

  const tabData = [
    { label: 'Women and Girls', key: '1'},
    { label: 'Family', key: '3'},
    { label: 'Mental Health', key: '4'}
  ]

  const handleTabChange = (activeKey) => {
    setProgramId(activeKey)
  };

  useEffect(() => {
    fetch(`https://port-0-code-to-give-m05y7f0q09864f76.sel4.cloudtype.app/events/${programId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setEvents(data);
        
        // Connect and open a Database
        const request = indexedDB.open("GetEventDB", 1)
        
        request.onupgradeneeded = (event) =>{
          const db = event.target.result;
          if (!db.objectStoreNames.contains("events")){
            db.createObjectStore('events', { keyPath: 'id' });
          }
        }

        const dbData = {"id": programId, "data": data}
        console.log(dbData)

        request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction('events', 'readwrite');
          const events = transaction.objectStore('events');
          events.put(dbData);
        };

        request.onerror = (event) => {
          console.error('Database error:', event.target.error);
        };
      })
      .catch(error => {
        const request = indexedDB.open("GetEventDB", 1);
          request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction('events', 'readonly');
            const store = transaction.objectStore('events');

            const getRequest = store.get(programId); // Use the key to get the specific record

            getRequest.onsuccess = (event) => {
              const dbData = event.target.result;
              const data = dbData.data
              if (data) {
                setEvents(data);
              } else {
                console.log('No data found for the given key.');
              }
            };

            getRequest.onerror = (event) => {
              console.error('Error retrieving data:', event.target.error);
            };
          };

          request.onerror = (event) => {
            console.error('Database error:', event.target.error);
          };
          throw new Error('Network response was not ok');
      });
  }, [programId]);

  const eventsRef = useRef(null);

  const scrollToEvents = () => {
    eventsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

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

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "white" }}>
      
      <div style={{ backgroundImage: "url(/events.png)", backgroundSize: "cover", width: "100%", height: "770px", backgroundPosition: "center", display: "flex", justifyContent: "center", alignItems: "end" }}>
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

        <div ref={eventsRef} style ={{paddingBottom: "100px"}}></div>
      </div>
      
      <div  style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", marginTop: "20px", backgroundColor: "white", width: "100%" }}></div>
      

      <Tabs
        defaultActiveKey="3"
        centered
        onChange={handleTabChange}
      
      
        items={tabData.map(({ label, key }) => ({
          label,
          key,
          children: (

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", backgroundColor: "white", width: "100%" }}>
          {events.map((event, index) => {
            
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
                interests={event.interests}
                skills={event.skills}
                imgUrl={event.imgUrl}
                description={event.description}
              />)
          })}
        </div>)}))}>
      </Tabs>

      <div style={{ paddingBottom: "30px", backgroundColor: "white", width: "100%" }}></div>
      <ChatBot />

    </div>
  );
}

export default EventPage;