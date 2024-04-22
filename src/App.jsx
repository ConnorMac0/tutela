import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import NewDrop from './components/NewDrop';

const StyledBody = styled.div`
`;

function App() {

  return (
    <StyledBody>
      <Header />
      <NewDrop />
    </StyledBody>
  )
}

export default App
