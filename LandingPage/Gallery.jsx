import React, { useState } from 'react';

const Gallery = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const handleNextImage = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    };

    return (
        <div className="gallery">
            <img src={images[currentImage]} onClick={handleNextImage}/>
        </div>
    );
};

export default Gallery;
