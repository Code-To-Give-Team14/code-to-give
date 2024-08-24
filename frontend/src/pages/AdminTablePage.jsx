import React, { useState } from 'react';
import { Input } from "antd";
import EventList from "../components/EventList.jsx";
import '../styles/AdminTable.css';

const AdminTablePage = () => {
  const [events, setEvents] = useState([
    { title: 'Weekly Chai Gathering', date: '2024-08-23', id: 1 },
    { title: 'Weekly Elderly Gathering', date: '2024-08-24', id: 2 },
    { title: 'Storytelling Session', date: '2024-08-25', id: 3 }
  ]);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [value, setValue] = useState("");  // Declare the value state here

  const handleEdit = (id) => {
    // Open event creation box for event with id
  };

  const handleDelete = (id) => {
    // Inactivate event data
    const newEvents = events.filter(event => event.id !== id);
    setEvents(newEvents);
    setFilteredEvents(newEvents);
  };

  const onChange = (event) => {
    console.log("onChange Input:", event.target.value); // Log input value
    setValue(event.target.value);  // Update the value state appropriately
    onSearch(event.target.value); // Use onSearch to filter events based on the input
  };

  const onSearch = (value) => {
    console.log("Search Value:", value); // Check what you're searching for
    if (!value.trim()) {  // Check if the value is not just whitespace
      console.log("Resetting filter.");
      setFilteredEvents(events); // Reset if search is cleared
    } else {
      const filtered = events.filter(event =>
        event.title.toLowerCase().includes(value.toLowerCase())
      );
      console.log("Filtered Events:", filtered); // Check the filtered results
      setFilteredEvents(filtered);
    }
  };

  return (
    <div>
      <Input
        placeholder="Search"
        value={value}
        onChange={onChange}
        onSearch={() => onSearch(value)}  // Ensure onSearch is called with current value
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