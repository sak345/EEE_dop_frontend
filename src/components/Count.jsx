import React from "react";

function Count({ data }) {
    return <p style={{
        color: '#4CAF50', // Green text
        fontSize: '16px', // Larger text
        border: '2px solid #4CAF50', // Green border
        padding: '10px', // Space around text
        borderRadius: '5px',
        maxWidth: '500px',
        height: '40px',
        marginRight: '45px',
    }}>Count: {data}</p>
}

export default Count;