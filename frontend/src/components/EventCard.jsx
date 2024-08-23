import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import EventDescription from './EventDescription';

const { Meta } = Card;

const EventCard = (props) => {

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleClick = () => {
        console.log("EOH")
    };

    const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    return (

        <div style = {{margin: "20px"}}>
            <Card
                hoverable
                style = {{ width: 350 }}
                onClick = {showModal}
                cover = {
                    <img alt="example" src = {props.imageURL} style={{width:350, height:200, display: "flex", objectFit:"cover"}} />
                }
            >
                <div style={{ display: "flex", flexDirection: "column", padding: "5px" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>    
                        <div style={{ display: "flex", flexDirection: "column", justifyContent:"center", alignContent:"center", marginRight: "20px", fontWeight: "bold"}}>
                            <div style = {{display:"flex", justifyContent:"center"}}> 
                                <div style={{ display: "flex", fontWeight: "bold", fontSize: "14px", textAlign: "center", color: "red"}}>
                                    {props.month}
                                </div>
                            </div>
                            <div style = {{display:"flex", justifyContent:"center"}}> 
                                <div style={{ display: "flex", fontWeight: "bold", fontSize: "16px", textAlign: "center"}}>
                                    {props.day}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column"}} >
                            <div style = {{fontWeight: "bold", fontSize: "15px"}}>
                                {props.title}
                            </div>
                            <div style={{ fontSize: "15px" }}>
                                {props.time}
                            </div>  
                        </div>
                    </div>
                </div>
            </Card>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width = {800}>
                <div style = {{display: "flex", flexDirection: "column"}}>
                    <EventDescription
                        title = {props.title}
                        day = {props.day}
                        month = {props.month}
                        time = {props.time}
                        description = {props.description}
                    />
                    <div style = {{display:"flex", justifyContent:"center", margin: "8px"}}>
                        <Button type="primary" style = {{width: "400px", height: "70px", backgroundColor:"#f9ef1e", color: "black", fontWeight: "bold"}}>Register as a Participant</Button>
                    </div>
                    <div style = {{display:"flex", justifyContent:"center", margin: "8px"}}>
                        <Button style = {{width: "400px", height: "70px", fontWeight: "bold"}}>Register as a Volunteer</Button>
                    </div>
                   
                </div>
                
            </Modal>
        </div>
  )
}

export default EventCard