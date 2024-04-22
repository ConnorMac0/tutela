import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import NewDrop from './components/NewDrop';
import Gallery from './components/Gallery';

const StyledBody = styled.div`
`;

function App() {
  const imageUrls = [
    {'image': './assets/dropgalllery/andy1.png'},
    {'image': './assets/dropgalllery/andy2.png'},
    {'image': './assets/dropgalllery/ronan3.png'},
    {'image': './assets/dropgalllery/ronan4.png'},
  ];
  return (
    <StyledBody>
      <Header />
      <NewDrop />
      <Gallery images={imageUrls}/>
    </StyledBody>
  )
}

export default App
