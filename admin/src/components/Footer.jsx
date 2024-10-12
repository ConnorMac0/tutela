import React from "react";

const Footer = ({isOpen, toggleMenu}) => {

    return (
        <div className="flex md:hidden items-center bg-green justify-center pt-4 pb-3 sticky bottom-0 border-t-2 border-ivory">
            <button onClick={()=>{toggleMenu()}} className="text-ivory">{!isOpen ? <i className="fa-solid fa-bars"></i> : <i className="fa-solid fa-xmark"></i>}</button>
        </div>
    )
}

export default Footer;