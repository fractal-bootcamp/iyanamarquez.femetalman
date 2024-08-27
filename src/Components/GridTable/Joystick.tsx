import { useEffect, useState } from 'react';
import { Joystick } from 'react-joystick-component';
import { initializeRos, publishJoystickData } from '../../rosService';

// where/how to publish x,y
// should x,y be constantly published to ros


const JoystickComponent = () => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);


    useEffect(() => {
        // Initialize ROS connection
        initializeRos('ws://localhost:9090') // Replace with your ROS WebSocket URL
            .then(() => console.log('ROS Initialized'))
            .catch((error) => console.error('Error initializing ROS:', error));
    }, []);

    useEffect(() => {
        // Publish joystick data whenever x or y changes
        publishJoystickData(x, y);
    }, [x, y]);


    return <div className='flex flex-col items-center justify-center gap-4'>
        <h1>x:{x} y:{y}</h1>
        <Joystick size={80} start={() => { }} move={(event) => { setX(event.x ?? 0); setY(event.y ?? 0); }}
            stop={() => { setX(0); setY(0); }} minDistance={30} />

    </div>;
};

export default JoystickComponent;