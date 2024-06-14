import React, { useState } from 'react';

const Mark = () => {
    const [ratings, setRatings] = useState([0]);
    const [averageRating, setAverageRating] = useState(0);

    const handleRatingChange = (event) => {
        const newRating = parseInt(event.target.value);
        setRatings([...ratings, newRating]);
    };

    const handleSubmit = () => {
        const sum = ratings.reduce((a, b) => a + b, 0);
        const newAverageRating = sum / (ratings.length-1);
        setAverageRating(newAverageRating);
    };

    return (
        <div>
            <div>
                <label>Введите оценку:</label>
                <input type="number" onChange={handleRatingChange} />
            </div>
            <button onClick={handleSubmit}>Отправить</button>
            <p>Средняя оценка: {averageRating.toFixed(1)}</p>
        </div>
    );
};

export default Mark;
