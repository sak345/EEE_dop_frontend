import React from 'react';
import './NoDataMessage.css'

function NoDataMessage({ data }) {
    return (
        <div className="no-data-message">
            <h2>No {data} in the Database</h2>
            <p>Please add a new {data} to see it here.</p>
        </div>
    );
}

export default NoDataMessage;