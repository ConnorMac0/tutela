import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from './components/Menu'

function App() {

  return (
    <div className='bg-ivory font-main text-black'>
      <ToastContainer />
      <Menu />
      <div className=''> 
        <Navbar />
        <div className='min-h-custom'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/shop' element={<Shop/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/Product/:productId' element={<Product/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/place-order' element={<PlaceOrder/>}/>
            <Route path='/orders' element={<Orders/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default App
