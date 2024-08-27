import React, { useState, useEffect } from 'react';

interface ROSImageStreamProps {
    streamUrl: string;
}

const ROSImageStream: React.FC<ROSImageStreamProps> = ({ streamUrl }) => {
    const [error, setError] = useState<string | null>(null);
    const [imageSrc, setImageSrc] = useState<string>(streamUrl);

    useEffect(() => {
        setImageSrc(streamUrl);
    }, [streamUrl]);

    return (
        <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <img 
                // src={imageSrc} 
                src='http://localhost:8080/stream?topic=/cv_camera/image_raw'
                alt="ROS Stream" 
                onError={() => setError('Failed to load image.')} 
                style={{ 
                    width: '100%', 
                    height: 'auto', 
                    objectFit: 'contain', 
                    display: 'block' 
                }} 
            />
        </div>
    );
};

export default ROSImageStream;
