import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

function Footer() {

    var {getCartCount, isOpen, toggleMenu} = useContext(ShopContext);

    return (
        <>
            <hr className='bg-ivory h-[2px]'/>
                <div className='flex w-full justify-between md:justify-center bg-green text-ivory items-center sticky bottom-0 border-t-2 border-ivory'>
                <div className='md:hidden flex w-1/3 justify-left pl-8'>
                    <button onClick={toggleMenu}>
                        {!isOpen ? "MENU" : "CLOSE"}
                    </button>
                </div>
                <img src={assets.logo} className='h-[76px]' alt="logo"/>
                <div className='md:hidden flex w-1/3 justify-end pr-8'><NavLink to='/cart'>CART({getCartCount()})</NavLink></div>
            </div>
        </>
    )
}

export default Footer