import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import NewDrop from './components/NewDrop';
import Cart from './components/Cart';
import Shop from './components/Shop';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Body = styled.div`
  background-color: #C9BDAC;
  font-family: Oswald;
`;

function App() {

  return (
    <Body>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/tutela/' element={<NewDrop />}/>
        <Route path='/shop/' element={<Shop />}/>
        <Route path='/cart/' element={<Cart />}/>
      </Routes>
      <Footer />
      </BrowserRouter>
    </Body>
  )
}

export default App
