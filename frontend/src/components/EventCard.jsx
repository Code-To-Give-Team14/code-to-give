import React from 'react'
import { Card } from 'antd';

const { Meta } = Card;

const EventCard = (props) => {
  return (
    <div style = {{margin: "20px"}}>
        <Card
            hoverable
            style = {{ width: 350 }}
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
    </div>
  )
}

export default EventCard