import React from 'react'
import EventList from "components/EventList.js"

const AdminTablePage = () => {

  const [events, setEvents] = useState([
    { title: 'Weekly Chai Gathering', date: '2024-08-23', id: 1 },
    { title: 'Weekly Elderly Gathering', date: '2024-08-24', id: 2 },
    { title: 'Storytelling Session', date: '2024-08-25', id: 3 }
    ])

  const handleEdit = (id) => {
    //open event creation box for event with id
  }

  const handleDelete = (id) => {
    const newEvents = events.filter(event => event.id !== id);
    setEvents(newEvents);
  }

  return (
    <div>
    <EventList events={events} name="All Published Events" handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  )
}

export default AdminTablePage