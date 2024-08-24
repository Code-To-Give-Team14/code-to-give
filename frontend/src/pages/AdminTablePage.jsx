import React, { useState } from 'react';
import { Input } from "antd";
import EventList from "../components/EventList.jsx";
import '../styles/AdminTable.css';

const AdminTablePage = () => {
  const [events, setEvents] = useState([
    { title: 'Weekly Chai Gathering', date: '2024-08-23', eventId: 1 },
    { title: 'Weekly Elderly Gathering', date: '2024-08-24', eventId: 2 },
    { title: 'Storytelling Session', date: '2024-08-25', eventId: 3 }
  ]);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [value, setValue] = useState("");

  const handleEdit = (id) => {
    // Open event edit page for event with id
  };

  const handleDelete = (id) => {
    // Inactivate event data
    const newEvents = events.filter(event => event.eventId !== id);
    setEvents(newEvents);
    setFilteredEvents(newEvents);
  };

  const onChange = (event) => {
    setValue(event.target.value);
    onSearch(event.target.value);
  };

  const onSearch = (value) => {
    if (!value.trim()) { 
      console.log("Resetting filter.");
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event =>
        event.title.toLowerCase().includes(value.toLowerCase())
      );
      console.log("Filtered Events:", filtered);
      setFilteredEvents(filtered);
    }
  };

  return (
    <div>
      <Input
        placeholder="Search"
        value={value}
        onChange={onChange}
        onSearch={onSearch} 
        style={{ width: "400px" }}
      />
      <EventList 
        events={filteredEvents} 
        name="All Published Events" 
        handleEdit={handleEdit} 
        handleDelete={handleDelete} 
      />
    </div>
  )
}

export default AdminTablePage;