import { useEffect, useState } from 'react';
// Import the mock ROS library
import MockRos from './mockRoslib';

const { Ros, Topic } = MockRos; // Destructure to get Ros and Topic

const FakeRosConnection = () => {
    const [ros, setRos] = useState(null);
    const [rosConnected, setRosConnected] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Initialize Mock ROS connection
        const rosInstance = new Ros();

        rosInstance.on('connection', () => {
            console.log('Connected to Mock ROS');
            setRosConnected(true);
        });

        rosInstance.on('error', (error) => {
            console.error('Error connecting to Mock ROS:', error);
        });

        rosInstance.on('close', () => {
            console.log('Connection to Mock ROS closed');
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
            // Subscribe to a Mock ROS topic
            const listener = new Topic({
                ros: ros,
                name: '/example_topic',
                messageType: 'std_msgs/String',
            });

            listener.subscribe((msg) => {
                // console.log('Received message on ' + listener.name + ': ' + msg.data);
                setMessage(msg.data); // Update state with received message
            });

            // Cleanup on component unmount
            return () => {
                listener.unsubscribe();
            };
        }
    }, [ros]);

    const publishMessage = () => {
        if (ros) {
            const publisher = new Topic({
                ros: ros,
                name: '/example_topic',
                messageType: 'std_msgs/String',
            });

            const msg = {
                data: 'Yipppie yay',
            };

            publisher.publish(msg);
        }
    };

    return (
        <div>
            <h1>Mock ROS Connection Status</h1>
            <p>{rosConnected ? 'Connected to Mock ROS' : 'Disconnected from Mock ROS'}</p>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={publishMessage}>Publish Message</button>
            <h2>Latest Message</h2>
            <p>{message}</p>
        </div>
    );
};

export default FakeRosConnection;
