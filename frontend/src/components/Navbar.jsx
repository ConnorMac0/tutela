import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

function Navbar() {

    var { getCartCount, toggleMenu, isOpen } = useContext(ShopContext);

    return (
        <div className='flex justify-center md:justify-between bg-green text-ivory items-center pt-4 pb-3 border-b-2 border-ivory sticky top-0'>
            <div className='hidden md:flex w-1/3 justify-left pl-8'>
                <button onClick={toggleMenu}>
                    {!isOpen ? "MENU" : "CLOSE"}
                </button>
            </div>
            <NavLink className='w-full md:w-1/3 font-brand text-5xl justify-center flex' onClick={()=>isOpen = false} to='/'>TUTELA</NavLink>
            <div className='hidden md:flex w-1/3 justify-end pr-8'><NavLink to='/cart'>CART({getCartCount()})</NavLink></div>
        </div>
    )
}

export default Navbar