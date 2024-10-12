import React from "react";
import { NavLink } from 'react-router-dom'

const Menu = ({isOpen, toggleMenu, setToken}) => {

    return (
        <div className='flex md:hidden'>
            <div className={`w-full bg-green text-ivory fixed h-full transition-transform transform ${
            isOpen ? 'translate-y-80' : 'translate-y-full'
            }`}>
                <div className='flex flex-col pl-5 gap-5 pt-6'>
                    <NavLink onClick={()=>toggleMenu()} to='/'>DASHBOARD</NavLink>
                    <NavLink onClick={()=>toggleMenu()} to='/products'>PRODUCTS</NavLink>
                    <NavLink onClick={()=>toggleMenu()} to='/add'>ADD PRODUCT</NavLink>
                    <NavLink onClick={()=>toggleMenu()} to='/users'>USERS</NavLink>
                    <NavLink onClick={()=>toggleMenu()} to='/orders'>ORDERS</NavLink>
                </div>
                <div className="flex justify-center pt-5">
                    <button onClick={()=>{
                        setToken('')
                        toggleMenu()
                        }} className=""><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                </div>
            </div>
        </div>
    )
}

export default Menu;