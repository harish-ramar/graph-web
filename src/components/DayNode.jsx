import React from 'react';
import { Handle } from '@xyflow/react';

const DayNode = ({ id, data }) => {
    const handleDayChange = (e) => {
        data.onChange(id, { day: e.target.value, degree: data.degree });
    };

    const handleDegreeChange = (e) => {
        data.onChange(id, { day: data.day, degree: +e.target.value });
    };

    return (
        <div
            style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                background: '#fff',
                width: '200px',
            }}
        >
            <label>
                Day: 
                <select value={data.day} onChange={handleDayChange} style={{ width: '100%' }}>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </select>
            </label>
            <label>
                Degree:
                <input
                    type='number'
                    value={data.degree}
                    onChange={handleDegreeChange}
                    className="nodrag"
                    style={{ width: '100%', marginTop: '5px' }}
                />
            </label>
            <Handle
                type='source'
                position='right'
                style={{ background: '#555', marginTop: '10px' }}
            />
        </div>
    );
}

export default DayNode;