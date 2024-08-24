import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { Modal } from 'antd';
import EventDescription from './EventDescription';

const { Meta } = Card;

const EventCard = (props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [partiClicked, setPartiClicked] = useState(false)
    const [volunClicked, setVolunClicked] = useState(false)

    const showModal = () => {
        setIsModalOpen(true);
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
    
    const registerVolunteer = () => {
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
        </div>
  )
}

export default EventCard