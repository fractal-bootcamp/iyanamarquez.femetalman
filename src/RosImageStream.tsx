import React, { useEffect, useRef, useState } from 'react';
import ROSLIB from 'roslib';
import { initializeRos } from './rosService';

// interface ROSImageStreamProps {
//     rosUrl: string;
//     imageTopic: string;
// }

const ROSImageStream = () => {
    // TODO: Replace constants 
    const rosUrl = "ws://localhost:9090"
    const imageTopic = "/camera/image"

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        // Initialize ROS connection
        const setupRos = async () => {
            try {
                await initializeRos(rosUrl);

                // Set up image topic subscription
                const ros = new ROSLIB.Ros({ url: rosUrl });
                const imageTopicSub = new ROSLIB.Topic({
                    ros: ros,
                    name: imageTopic,
                    messageType: 'sensor_msgs/Image',
                });

                imageTopicSub.subscribe((message: any) => {
                    const imageData = new Uint8Array(message.data);
                    const blob = new Blob([imageData], { type: 'image/jpeg' }); // Adjust MIME type if necessary
                    const url = URL.createObjectURL(blob);
                    setImageUrl(url);
                });

                // Clean up on component unmount
                return () => {
                    imageTopicSub.unsubscribe();
                    ros.close();
                };

            } catch (error) {
                console.error('Failed to connect to ROS:', error);
            }
        };

        setupRos();
    }, [rosUrl, imageTopic]);

    useEffect(() => {
        if (imageUrl && canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                // Set canvas dimensions to match the image
                canvas.width = img.width;
                canvas.height = img.height;
                // Draw the image onto the canvas
                if (context) {
                    context.drawImage(img, 0, 0);
                }
            };

            img.src = imageUrl;
        }
    }, [imageUrl]);

    return (
        <div>
            <h1>Image Stream</h1>
            <canvas ref={canvasRef} />
            {!imageUrl && <p>Loading...</p>}
        </div>
    );
};

export default ROSImageStream;
