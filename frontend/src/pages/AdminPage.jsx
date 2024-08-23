import React, { useState } from 'react';
import EventList from "../components/EventList.jsx";
import SearchBar from "../components/SearchBar.jsx";
import '../styles/AdminTable.css';

const AdminPage = () => {
  const [events, setEvents] = useState([
    { title: 'Weekly Chai Gathering', date: '2024-08-23', id: 1 },
    { title: 'Weekly Elderly Gathering', date: '2024-08-24', id: 2 },
    { title: 'Storytelling Session', date: '2024-08-25', id: 3 }
  ]);
  const [filteredEvents, setFilteredEvents] = useState(events);

  const handleEdit = (id) => {
    // Open event creation box for event with id
  };

  const handleDelete = (id) => {
    const newEvents = events.filter(event => event.id !== id);
    setEvents(newEvents);
    setFilteredEvents(newEvents);
  };

  const handleSearch = (searchText) => {
    console.log("Search Text:", searchText); // Check the incoming search text
    if (!searchText) {
      setFilteredEvents(events); // Reset if search is cleared
      console.log("Resetting events because search is cleared.");
    } else {
      const filtered = events.filter(event => 
        event.title.toLowerCase().includes(searchText.toLowerCase())
      );
      console.log("Filtered Events:", filtered); // See what's being set
      setFilteredEvents(filtered);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <EventList 
        events={filteredEvents} 
        name="All Published Events" 
        handleEdit={handleEdit} 
        handleDelete={handleDelete} 
      />
    </div>
  )
}

export default AdminPage;