import React from 'react';


const Total = ({ course }) => {
    const sum = course.parts.reduce((total, part) => total + part.exercises, 0)
    return (
        <strong>Total number of exercises = {sum}</strong>
    )
}

export default Total;