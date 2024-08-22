import React, { useEffect, useState } from 'react';
import { getHelloWorld } from '../services/gethelloworld';



export default function HelloWorld() {
    
    const [testing, setTesting] = useState("Setup your DB / run the Backend server to see the response");

    useEffect(() => {
        getHelloWorld().then((response) => {
            setTesting(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <h1>{testing}</h1>
    );
}