import React from "react";
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="hidden md:flex md:flex-col bg-green min-h-desktop md:w-full justify-between border-r-2 border-green">
            <div className="w-full">
                <div className="flex flex-col w-full my-5">
                    <NavLink to='/' className="py-2 px-[20%] hover:bg-ivory"><span className="flex items-center justify-between"><i className="fa-solid fa-chart-line"></i>DASHBOARD</span></NavLink>
                    <NavLink to='/products' className="py-2 px-[20%] hover:bg-ivory"><span className="flex items-center justify-between"><i className="fa-solid fa-cart-shopping"></i>PRODUCTS</span></NavLink>
                    <NavLink to='/add' className="py-2 px-[20%] hover:bg-ivory"><span className="flex items-center justify-between"><i className="fa-regular fa-plus"></i>ADD PRODUCT</span></NavLink>
                    <NavLink to='/users' className="py-2 px-[20%] hover:bg-ivory"><span className="flex items-center justify-between"><i className="fa-solid fa-users"></i>USERS</span></NavLink>
                    <NavLink to='/orders' className="py-2 px-[20%] hover:bg-ivory"><span className="flex items-center justify-between"><i className="fa-solid fa-truck-fast"></i>ORDERS</span></NavLink>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;