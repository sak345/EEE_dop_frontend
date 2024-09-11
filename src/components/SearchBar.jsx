import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const StyledInput = styled.input`
  padding: 10px;
  fontSize: 17px;
  border: none;
  borderRadius: 5px;
  boxShadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  width: 100%;
  marginLeft: 25px;
  height: 40px;

  @media (min-width: 1000px) {
    width: 500px;
  }
`;
const StyledInputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 10px 0;
  marginLeft: 25px;

  @media (min-width: 1000px) {
    width: 500px;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

function SearchBar({ searchTerm, setSearchTerm }) {
  return <StyledInputWrapper>
    <StyledInput
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
    {searchTerm && (
      <ClearButton onClick={() => setSearchTerm('')}>
        <FaTimes />
      </ClearButton>
    )}
  </StyledInputWrapper>
}

export default SearchBar