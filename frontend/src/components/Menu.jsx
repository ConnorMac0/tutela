import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { NavLink } from 'react-router-dom';

const Menu = () => {

    var {isOpen} = useContext(ShopContext);

    return (
        <div className='text-sm'>
            <div className='hidden md:flex'>
                <div className={`w-[14%] bg-green text-ivory fixed min-h-screen transition-transform transform ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                    <div className='flex flex-col gap-5 pl-8 pt-[110px]'>
                        <NavLink onClick={()=>isOpen = false} className='hover:text-gray-800' to='/shop'>SHOP</NavLink>
                        <NavLink onClick={()=>isOpen = false} className='hover:text-gray-800' to='/about'>ABOUT</NavLink>
                        <NavLink onClick={()=>isOpen = false} className='hover:text-gray-800' to='/contact'>CONTACT</NavLink>
                        <NavLink onClick={()=>isOpen = false} className='hover:text-gray-800' to='/login'>LOGIN</NavLink>
                    </div>
                </div>
            </div>
            <div className='flex md:hidden'>
                <div className={`w-full bg-green text-ivory fixed h-full transition-transform transform ${
                isOpen ? 'translate-y-96' : 'translate-y-full'
                }`}>
                    <div className='flex flex-col gap-5 pl-8 pt-6'>
                        <NavLink onClick={()=>isOpen = false} className='hover:text-gray-800' to='/shop'>SHOP</NavLink>
                        <NavLink onClick={()=>isOpen = false} className='hover:text-gray-800' to='/about'>ABOUT</NavLink>
                        <NavLink onClick={()=>isOpen = false} className='hover:text-gray-800' to='/contact'>CONTACT</NavLink>
                        <NavLink onClick={()=>isOpen = false} className='hover:text-gray-800' to='/login'>LOGIN</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu