import React from 'react'
import { Tabs } from 'antd';
import eventDataList from '../assets/stubEngagementList.json'
import volunDataList from '../assets/stubVolunteerList.json'
import EngagementCard from '../components/EngagementCard';

const EngagementPage = () => {

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
      );
    })}
  </>
  );

  const onChange = (key) => {
    console.log(key);
  };

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
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      
      <div style={{ width: "100%" }}>
        <div style={{ backgroundImage: "url(/volunteer2.avif)", backgroundSize: "cover", backgroundPosition: "center", height: "300px" }}>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", width: '80%', margin: "10px" }}>
        <div style={{ width: "80%" }}>
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
            tabBarStyle={{ padding: "10px" }}
          />
        </div>
      </div>

    </div>
  );
}

export default EngagementPage
