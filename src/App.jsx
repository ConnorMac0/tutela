import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import NewDrop from './components/NewDrop';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div>
      <BrowserRouter>
      <Header />
      <NewDrop />
      </BrowserRouter>
    </div>
  )
}

export default App
