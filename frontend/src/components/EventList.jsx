const EventList = ({ events, title, handleDelete }) => {
    return (
      <div className="event-list">
        <h2>{ title }</h2>
        {events.map(event => (
          <div className="event-preview" key={event.id} >
            <h2>{ event.title }</h2>
            <p>{ event.date }</p>
            <button onClick={() => handleEdit(event.id)}>Edit</button>
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  }
   
  export default EventList;