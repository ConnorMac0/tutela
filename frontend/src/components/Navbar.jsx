import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

function Navbar() {

    const {getCartCount} = useContext(ShopContext);

    return (
        <div className='flex border-b-2 border-ivory items-center mx-auto my-0 justify-center pt-5 pb-2 sticky top-0 bg-green text-ivory md:justify-between'>
            <ul className='hidden flex text-lg gap-5 pl-20 md:block large:block hover:text-gray-800 hover:cursor-pointer'>
                <li><NavLink to='/shop'>SHOP</NavLink></li>
            </ul>
            <div className='text-6xl font-brand'><NavLink to='/'>TUTELA</NavLink></div>
            <ul className='hidden flex text-lg gap-5 pr-20 md:block large:block hover:text-gray-800 hover:cursor-pointer'>
                <li><NavLink to='/cart'>CART({getCartCount()})</NavLink></li>
            </ul>
        </div>
    )
}

export default Navbar