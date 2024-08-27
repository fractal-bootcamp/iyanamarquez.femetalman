// src/components/RosConnection.tsx
import React, { useEffect } from 'react';
import { initializeRos, publishMessage, callService } from './rosService';
import useRosStore from './rosStore/rosStore';

const RosConnection: React.FC = () => {
    const { rosConnected, setRosConnected } = useRosStore();

    useEffect(() => {
        initializeRos('http://localhost:8080')
            .then(() => {
                setRosConnected(true);
            })
            .catch(() => {
                setRosConnected(false);
            });
    }, [setRosConnected]);

    return (
        <div>
            <h1>ROS Connection Status</h1>
            <p>{rosConnected ? 'Connected to ROS' : 'Disconnected from ROS'}</p>
            <button onClick={() => publishMessage('/example_topic', { data: 'Hello, ROS!' })}>
                Publish Message
            </button>
            <button onClick={() => callService('/example_service', {})}>
                Call Service
            </button>
        </div>
    );
};

export default RosConnection;
