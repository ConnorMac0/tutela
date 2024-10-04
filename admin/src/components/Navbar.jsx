import React from "react";

const Navbar = () => {
    return (
        <div className="flex md:flex-col bg-green md:min-h-screen md:w-1/6 border-2 border-black justify-between">
            <div className="border-2 w-full">
                <div className="flex text-4xl font-brand p-2 border-2 border-red-600 w-full justify-center">Tutela</div>
                <ul className="hidden md:block w-full my-5 border-2 border-violet-600 px-4">
                    <li className="py-2">DASHBOARD</li>
                    <li className="py-2">PRODUCTS</li>
                    <li className="py-2">ADD</li>
                    <li className="py-2">USERS</li>
                    <li className="py-2">ORDERS</li>
                </ul>
            </div>
            <button className="hidden md:block border-2 border-blue-600 p-5 w-full">LOGOUT</button>
        </div>
    )
}

export default Navbar;