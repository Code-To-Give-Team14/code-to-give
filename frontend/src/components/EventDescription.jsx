import React from 'react';
import { Badge, Descriptions } from 'antd';



const EventDescription = (props) => {

    const items = [
        
        {
          key: '1',
          label: 'Date',
          children: props.day + " "+ props.month + ", " + props.year,
        },
        {
          key: '2',
          label: 'Time',
          children: props.hour + ":" + props.min + " - " + props.endHour + ":" + props.endMin,
        },
        {
          key: '3',
          label: 'Venue',
          children: props.venue,
        },
        {
          key: '4',
          label: 'Interests',
          children: props.interests.map(interest => (
            <Badge key={interest} count={interest} style={{ backgroundColor: '#f9ef1e', color: 'black', margin: '5px' }} />
          )),
        },
        {
          key: '5',
          label: 'Skills',
          children: props.skills.map(skill => (
            <Badge key={skill} count={skill} style={{ backgroundColor: '#f9ef1e', color: 'black', margin: '5px' }} />
          )),
        },
      ];
    
    const styledTitle = (
        <span style={{ fontSize: '28px', fontWeight: 'bold' }}>
            {props.title}
        </span>
    );

    return (
      <div style = {{padding: "50px"}}>
        
        <Descriptions  title={styledTitle} column={1} bordered items={items} labelStyle={{ backgroundColor: '#FFFFE0', fontWeight: "bold", color:"black"}}/>
        <div style={{ fontSize: '15px', marginTop: "30px", textAlign:"center"}}> {props.description}</div>
      </div>
    )
};

export default EventDescription;