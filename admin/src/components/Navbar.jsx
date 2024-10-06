import React from "react";

const Navbar = ({setToken}) => {
    return (
        <div className="flex items-center bg-green md:bg-ivory justify-between">
            <div className="flex justify-center text-4xl p-[3%] md:px-[3%] md:py-[.5%] font-brand w-full md:justify-normal">TUTELA</div>
            <button onClick={()=>setToken('')} className="hidden md:flex px-[3%] py-[.5%] items-center"><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
        </div>
    )
}

export default Navbar;