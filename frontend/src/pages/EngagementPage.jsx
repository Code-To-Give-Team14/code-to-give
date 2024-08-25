import React, { useRef, useState, useEffect } from 'react'
import { Tabs, Button, Modal } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';
import eventDataList from '../assets/stubEngagementList.json'
import volunDataList from '../assets/stubVolunteerList.json'
import EngagementCard from '../components/EngagementCard';
import QuizForm from '../components/QuizBox';
import EventDescription from '../components/EventDescription';

const EngagementPage = () => {

  const [eventId, setEventId] = useState("1")
  const [eventTitle, setEventTitle] = useState("DIY Mirror Clay Art")
  const [eventLink, setEventLink] = useState("https://www.youtube.com/watch?v=oR4vdnNa7oI")
  const [partiClicked, setPartiClicked] = useState(false)
  const [volunClicked, setVolunClicked] = useState(false)

  const eventsRef = useRef(null);

  const scrollToEvents = (id, title) => {
    eventsRef.current.scrollIntoView({ behavior: 'smooth' });
    setEventId(id);
    setEventTitle(title)
  };

  useEffect(() => {
    setEventLink(listOfLinks[eventId]);
  }, [eventId]);

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

  const listOfLinks = {
    "1": "https://www.youtube.com/embed/Gg2-hIdf61o",
    "2": "https://www.youtube.com/embed/Kv1vQyrEOyA",
    "3": "https://www.youtube.com/embed/Fo6Wg7rXW1A"
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPartiModalOpen, setIsPartiModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // Below
  const showPartiModal = () => {
    setIsPartiModalOpen(true);
  };
  const handlePartiOk = () => {
    setIsPartiModalOpen(false);
  };
  const handlePartiCancel = () => {
    setIsPartiModalOpen(false);
  };

  const registerParti = () => {
    if (partiClicked){
        setPartiClicked(!partiClicked)
    }
    else{
        setPartiClicked(!partiClicked)
        setVolunClicked(false)
    } 
};

const registerVolun = () => {
    if (volunClicked){
        setVolunClicked(!volunClicked)
    }
    else{
        setVolunClicked(!volunClicked)
        setPartiClicked(false)
    }
    
}; 

  const navigate = useNavigate();
  const ParticipatedEvents = () => (

    <>
      {eventDataList.map(event => {
        const date = new Date(event.startTime);
        const year = date.getFullYear();
        const month = monthMap[date.toISOString().slice(5, 7)];
        const dateStr = date.toISOString().split("T")[1]
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        
        const endDate = new Date(event.endTime);
        const endHour = String(endDate.getHours()).padStart(2, '0');
        const endMin = String(endDate.getMinutes()).padStart(2, '0');

        return (
          <>
          <div 
            onClick = {() => showPartiModal(event)}
          >
            <EngagementCard
              key={event.eventId}
              title={event.title}
              description={event.description}
              year={year}
              month={month}
              day={day}
              hour={hour}
              min={min}
              endHour = {endHour}
              endMin = {endMin}
            />
            
          </div>
          <Modal open={isPartiModalOpen} onOk={handlePartiOk} onCancel={handlePartiCancel} width = {700}>
            <div style = {{display: "flex", flexDirection: "column"}}>
              <EventDescription
                  title = {event.title}
                  year = {year}
                  month = {month}
                  day = {day}
                  hour={hour}
                  min={min}
                  endHour={endHour}
                  endMin={endMin}
                  description = {event.description}
                  venue = {event.venue}
              />
              <div style = {{display:"flex", justifyContent:"center", margin: "8px"}}>
                  <Button 
                      type="primary" 
                      style = {{width: "400px", height: "70px", backgroundColor: partiClicked ? "#d9d9d9" : "#f9ef1e", color: "black", fontWeight: "bold"}}
                      onClick = {registerParti}
                  > {partiClicked ? "Successfully Registered" : "Register as a participant"}</Button>
              </div>
              <div style = {{display:"flex", justifyContent:"center", margin: "8px"}}>
                  <Button 
                      style = {{width: "400px", height: "70px", fontWeight: "bold", backgroundColor: volunClicked ? "#d9d9d9": "white", color: volunClicked? "black": "#108ee9"}}
                      onClick = {registerVolun}    
                  >{volunClicked ? "Successfully Registered" : "Register as a volunteer"}</Button>
              </div>
          </div>
          </Modal>
        </>
        );
      })}
    </>

  );
  
  const VolunteeredEvents = () => (
    
    <>
    {volunDataList.map(event => {
      const date = new Date(event.startTime);
      const year = date.getFullYear();
      const month = monthMap[date.toISOString().slice(5, 7)];
      const dateStr = date.toISOString().split("T")[1]
      const day = String(date.getDate()).padStart(2, '0');
      const hour = String(date.getHours()).padStart(2, '0');
      const min = String(date.getMinutes()).padStart(2, '0');
      
      const endDate = new Date(event.endTime);
      const endHour = String(endDate.getHours()).padStart(2, '0');
      const endMin = String(endDate.getMinutes()).padStart(2, '0');

      return (
        <div
          onClick={() => scrollToEvents(event.eventId, event.title)}
          >
          <EngagementCard
            key={event.eventId}
            title={event.title}
            description={event.description}
            year={year}
            month={month}
            day={day}
            hour={hour}
            min={min}
            endHour = {endHour}
            endMin = {endMin}
          />
        </div>
      );
    })}
  </>
  );

  const items = [
    {
      key: '1',
      label: 'Participated Events',
      children: <ParticipatedEvents />,
    },
    {
      key: '2',
      label: 'Volunteered Events',
      children: <VolunteeredEvents />,
    },
  ];

  return (

    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",  }}>
      
      <div style={{ width: "100%", overflow: 'hidden' }}>
        <div style={{ backgroundImage: "url(/volunteer.avif)", backgroundSize: "cover", objectPosition: 'top', backgroundPosition: "center", height: "250px"}}>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", width: '80%', margin: "10px", overflowY: "auto" }}>
        
        <div style={{ width: "80%"}}>
          <Tabs
            defaultActiveKey="1"
            items={items}
            tabBarStyle={{ padding: "10px" }}
          />
        </div>
      </div>
      
      <div ref={eventsRef} style = {{height:"120px"}}></div>
      <div  style ={{height: "100vh"}}>
        <div style ={{marginTop: "10px", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
          <div 
            style = {{fontSize: "25px", fontWeight: "bold", padding: "15px", textAlign:"center", marginBottom: "20px"}}> Volunteer Training - {eventTitle}</div>
            <iframe
                  width="800"
                  height="450"
                  src={eventLink}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
            ></iframe>
        </div>

        <div style ={{display: "flex", justifyContent:"center", padding:"40px", alignItems:"self-start"}}>
        <Button
          onClick={showModal}
          style={{
            width: '200px',
            height: '60px',
            fontSize: '18px',
          }}
        >
          Attempt Quiz
        </Button>
        </div>

        
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={600}>
          <div style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
            Quiz
          </div>
          <QuizForm/>
        </Modal>
      </div>
    </div>

  );
  
}

export default EngagementPage