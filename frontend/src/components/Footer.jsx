import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

function Footer() {

    const {getCartCount} = useContext(ShopContext);

    return (
    <div className='flex w-full border-t-2 border-ivory items-center justify-between sticky bottom-0 bg-green text-ivory md:justify-center'>
        <ul className='text-md px-8 md:hidden hover:cursor-pointer'>
            <li><NavLink to='/shop'>SHOP</NavLink></li>
        </ul>
        <img src={assets.logo} className='w-36' alt="logo"/>
        <ul className='text-md px-8 md:hidden hover:cursor-pointer'>
            <li><NavLink to='/cart'>CART({getCartCount()})</NavLink></li>
        </ul>
    </div>
    )
}

export default Footer