import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Sidebar from './components/Sidebar';

function App() {

  return (
    <div className='md:flex md:flex-row bg-ivory text-black min-h-screen'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/add' element={<Add />} />
        <Route path='/list' element={<List />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
    </div>
  )
}

export default App