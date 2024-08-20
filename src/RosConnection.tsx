import { useEffect, useState } from 'react';
import ROSLIB from 'roslib';
// import MockRos from './mockRoslib'; // Import the default export
// const { Ros, Topic } = MockRos; 

const RosConnection = () => {
    const [ros, setRos] = useState(null);
    const [rosConnected, setRosConnected] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Initialize ROS connection
        const rosInstance = new ROSLIB.Ros({
            url: 'ws://localhost:9090', // URL of the ROSBridge WebSocket
        });

        rosInstance.on('connection', () => {
            console.log('Connected to ROS');
            setRosConnected(true);
        });

        rosInstance.on('error', (error: Error) => {
            console.error('Error connecting to ROS:', error);
        });

        rosInstance.on('close', () => {
            console.log('Connection to ROS closed');
            setRosConnected(false);
        });

        setRos(rosInstance);

        // Cleanup on component unmount
        return () => {
            if (rosInstance) {
                rosInstance.close();
            }
        };
    }, []);

    useEffect(() => {
        if (ros) {
            // Subscribe to a ROS topic
            const listener = new ROSLIB.Topic({
                ros: ros,
                name: '/example_topic',
                messageType: 'std_msgs/String',
            });

            listener.subscribe((message) => {
                console.log('Received message on ' + listener.name + ': ' + message.data);
                setMessage(message.data); // received message
            });

            // Cleanup 
            return () => {
                listener.unsubscribe();
            };
        }
    }, [ros]);

    const publishMessage = () => {
        if (ros) {
            const publisher = new ROSLIB.Topic({
                ros: ros,
                name: '/example_topic',
                messageType: 'std_msgs/String',
            });

            const msg = new ROSLIB.Message({
                data: 'Hello, ROS!',        
            });

            publisher.publish(msg);
        }
    };


    return (
        <div>
            <h1>ROS Connection Status</h1>
            <p>{rosConnected ? 'Connected to ROS' : 'Disconnected from ROS'}</p>
            <button onClick={publishMessage}>Publish Message</button>
            <h2>Latest Message</h2>
            <p>{message}</p>
        </div>
    );
};

export default RosConnection;
