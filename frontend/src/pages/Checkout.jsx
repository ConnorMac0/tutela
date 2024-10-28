import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Checkout = () => {

    const {navigate} = useContext(ShopContext);

    return (
        <div className="flex flex-col md:flex-row gap-10 md:gap-0 h-custom w-full items-center p-5 justify-center">
            <div className="flex flex-col justify-center items-center text-center w-full md:w-1/2 gap-5">
                <p className="text-xl">GUEST CHECKOUT</p>
                <p className="text-sm">You can check out now without creating an account. <br /> You can track your orders if you create an account later.</p>
                <button onClick={()=>navigate('/place-order')} className="bg-green py-1 w-1/2 md:w-1/3 rounded-full text-ivory">CONTINUE AS GUEST</button>
            </div>
            <div className="flex h-[2px] md:h-full bg-green w-full md:w-[2px]"></div>
            <div className="flex flex-col justify-center items-center text-center w-full md:w-1/2 gap-5">
                <p className="text-xl">HAVE AN ACCOUNT?</p>
                <button onClick={()=>navigate('/login')} className="bg-green py-1 w-1/2 md:w-1/3 rounded-full text-ivory">LOGIN</button>
            </div>
        </div>
    )
}

export default Checkout;