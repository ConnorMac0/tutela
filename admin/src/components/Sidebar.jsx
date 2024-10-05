import React from "react";
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="flex md:flex-col bg-green md:min-h-screen md:w-1/6 justify-between border-r-2 border-green">
            <div className="w-full">
                <div className="flex text-4xl font-brand p-2 w-full justify-center md:bg-ivory">TUTELA</div>
                <div className="hidden md:flex flex-col w-full my-5">
                    <NavLink to='/' className="py-2 px-[20%] hover:bg-ivory"><span className="flex items-center justify-between"><i className="fa-solid fa-chart-line"></i>DASHBOARD</span></NavLink>
                    <NavLink to='/products' className="py-2 px-[20%] hover:bg-ivory"><span className="flex items-center justify-between"><i className="fa-solid fa-cart-shopping"></i>PRODUCTS</span></NavLink>
                    <NavLink to='/add' className="py-2 px-[20%] hover:bg-ivory"><span className="flex items-center justify-between"><i className="fa-regular fa-plus"></i>ADD PRODUCT</span></NavLink>
                    <NavLink to='/users' className="py-2 px-[20%] hover:bg-ivory"><span className="flex items-center justify-between"><i className="fa-solid fa-users"></i>USERS</span></NavLink>
                    <NavLink to='/orders' className="py-2 px-[20%] hover:bg-ivory"><span className="flex items-center justify-between"><i className="fa-solid fa-truck-fast"></i>ORDERS</span></NavLink>
                </div>
            </div>
            <button className="hidden md:block mb-5 w-full hover:bg-ivory"><i className="fa-solid fa-arrow-right-from-bracket"></i> LOGOUT</button>
        </div>
    )
}

export default Sidebar;