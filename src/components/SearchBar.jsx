import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 10px;
  fontSize: 17px;
  border: none;
  borderRadius: 5px;
  boxShadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  width: 100%;
  margin: 10px 0;
  marginLeft: 25px;
  height: 40px;

  @media (min-width: 1000px) {
    width: 500px;
  }
`;

function SearchBar({ searchTerm, setSearchTerm }) {
    // return <input
    //     type="text"
    //     placeholder="Search"
    //     value={searchTerm}
    //     onChange={e => setSearchTerm(e.target.value)}
    //     style={{
    //         padding: '10px',
    //         fontSize: '17px',
    //         border: 'none',
    //         borderRadius: '5px',
    //         boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
    //         width: '500px',
    //         margin: '10px 0',
    //         marginLeft: '25px',
    //         height: '40px',
    //     }}
    // />
    return <StyledInput
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
    />
}

export default SearchBar