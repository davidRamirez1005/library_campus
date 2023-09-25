import React, { useState } from 'react';
import image from '../assets/img/logoCampus.png'

export default function Loader() {
    const [isLoading, setIsLoading] = useState(true);

    if (isLoading) {
    return (
        <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        }}>
        <img src={image} alt="Loading..." width={350} />
        </div>
    );
    } else {
        return null;
    }
};