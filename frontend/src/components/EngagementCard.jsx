import React from 'react';

const EngagementCard = (props) => {


  return (
    <div 
      style={{ display: "flex", margin: "15px", backgroundColor: "#f0f4ff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", overflow: "hidden" }}
    >
      
      <div style={{ display: "flex", flexDirection: "column", width: "80px", padding: "15px", borderRight: "2px solid #007bff", alignItems: "center", backgroundColor: "#e6f0ff" }}>
        <div style={{ fontSize: "22px", fontWeight: "bold", color: "#007bff", textAlign: "center" }}>{props.month}</div>
        <div style={{ fontSize: "22px", fontWeight: "bold", color: "#004a99", textAlign: "center" }}>{props.day}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", padding: "20px", flexGrow: 1 }}>
        <div style={{ fontSize: "22px", fontWeight: "bold", color: "#004a99", marginBottom: "10px" }}>{props.title}</div>
        <div style={{ fontSize: "18px", color: "#333" }}>{props.hour}:{props.min} - {props.endHour}:{props.endMin}</div>
      </div>

    </div>
  );
}

export default EngagementCard;