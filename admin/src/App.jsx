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
import Menu from './components/Menu';
import Footer from './components/Footer';
import Users from './pages/Users';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$';

function App() {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(()=>{
    localStorage.setItem('token', token)
  },[token])

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  }

  return (
    <div className='bg-ivory text-black font-main min-h-mobile md:min-h-desktop'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken}/>
        :
        <>
          <Menu isOpen={isOpen} toggleMenu={toggleMenu} setToken={logout}/>
          <div>
            <Navbar setToken={logout}/>
            <div className='flex min-h-mobile md:min-h-desktop w-full'>
              <Sidebar />
              <div className='w-full md:w-[82%]'>
                <Routes>
                  <Route path='/' element={<Dashboard token={token}/>} />
                  <Route path='/add' element={<Add token={token}/>} />
                  <Route path='/products' element={<List token={token}/>} />
                  <Route path='/orders' element={<Orders token={token}/>} />
                  <Route path='/users' element={<Users token={token}/>} />
                </Routes>
              </div>
            </div>
            <Footer isOpen={isOpen} toggleMenu={toggleMenu}/>
          </div>
        </>}
    </div>
  )
}

export default App