import React from "react";

const Navbar = ({logout}) => {

    return (
        <div className="flex items-center bg-green md:bg-ivory justify-between pt-4 pb-3">
            <div className="flex justify-center text-4xl text-ivory md:text-black md:px-[5.5%] md:py-2 font-brand w-full md:justify-normal">TUTELA</div>
            <button onClick={()=>logout()} className="hidden md:flex md:px-[5.5%] md:py-2 items-center"><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
        </div>
    )
}

export default Navbar;