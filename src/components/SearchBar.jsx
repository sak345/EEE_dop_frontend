import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
    return <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{
            padding: '10px',
            fontSize: '17px',
            border: 'none',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
            width: '500px',
            margin: '10px 0',
            marginBottom: '-50px',
            marginLeft: '25px',
            height: '40px',
        }}
    />
}

export default SearchBar