import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(()=>{
    localStorage.setItem('token', token)
  },[token])

  return (
    <div className='bg-ivory text-black min-h-screen font-main'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken}/>
        :
        <>
          <Navbar setToken={setToken}/>
          <div className='flex md:min-h-custom w-full'>
            <Sidebar />
            <div className='w-full md:w-[82%] p-5'>
              <Routes>
                <Route path='/' element={<Dashboard token={token}/>} />
                <Route path='/add' element={<Add token={token}/>} />
                <Route path='/list' element={<List token={token}/>} />
                <Route path='/orders' element={<Orders token={token}/>} />
              </Routes>
            </div>
          </div>
        </>}
    </div>
  )
}

export default App