import React, { useEffect, useState, useRef } from 'react';
import ROSLIB from 'roslib';

const ROSImageStream = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ros = new ROSLIB.Ros({
            url: 'ws://localhost:9090' // ROS Bridge WebSocket URL
        });

        ros.on('connection', () => console.log('Connected to ROS Bridge WebSocket server.'));
        ros.on('error', (error) => {
            console.error('Error connecting to ROS Bridge WebSocket server:', error);
            setError('Error connecting to ROS Bridge WebSocket server.');
        });
        ros.on('close', () => {
            console.log('Connection to ROS Bridge WebSocket server closed.');
            setError('Connection to ROS Bridge WebSocket server closed.');
        });

        const imageTopic = new ROSLIB.Topic({
            ros: ros,
            name: '/cv_camera/image_raw',
            messageType: 'sensor_msgs/Image'
        });

        imageTopic.subscribe((message) => {
            const { data, width, height, step } = message;
            if (!data) {
                console.error('No data received');
                return;
            }

            // Convert BGR8 to RGBA
            const bgrData = new Uint8Array(data);
            const rgbaData = convertBGR8ToRGBA(bgrData, width, height, step);

            // Convert RGBA to Base64
            const base64Image = convertRGBAToBase64(rgbaData, width, height);
            setImageSrc(base64Image);
        });

        return () => {
            imageTopic.unsubscribe();
            ros.close();
        };
    }, []);

    const convertBGR8ToRGBA = (bgrData: Uint8Array, width: number, height: number, step: number) => {
        const rgbaData = new Uint8ClampedArray(width * height * 4);

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                const bgrIndex = i * step + j * 3;
                const rgbaIndex = (i * width + j) * 4;

                // Convert BGR to RGB
                rgbaData[rgbaIndex] = bgrData[bgrIndex + 2];     // R
                rgbaData[rgbaIndex + 1] = bgrData[bgrIndex + 1]; // G
                rgbaData[rgbaIndex + 2] = bgrData[bgrIndex];     // B
                rgbaData[rgbaIndex + 3] = 255;                  // A (full opacity)
            }
        }

        return rgbaData;
    };

    const convertRGBAToBase64 = (rgbaData: Uint8ClampedArray, width: number, height: number) => {
        const canvas = canvasRef.current;
        if (!canvas) {
            console.error('Canvas not found');
            return '';
        }
        const context = canvas.getContext('2d');
        if (!context) {
            console.error('Canvas context not available');
            return '';
        }

        canvas.width = width;
        canvas.height = height;

        // Create an ImageData object
        const imageData = new ImageData(rgbaData, width, height);
        context.putImageData(imageData, 0, 0);

        // Convert canvas to Base64
        return canvas.toDataURL('image/jpeg'); // or 'image/png'
    };

    return (
        <div>
            {/* <div style={{ height: '300px', width: '500px', backgroundColor: 'lightblue' }}> */}
                {error && <p>Error: {error}</p>}
                {imageSrc ? (
                    <img src={imageSrc} alt="ROS Stream" />
                ) : (
                    <p>Loading image...</p>
                )}
                <canvas ref={canvasRef} ></canvas>
            {/* </div> */}
        </div>
    );
};

export default ROSImageStream;
