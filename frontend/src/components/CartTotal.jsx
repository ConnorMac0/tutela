import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {

    const { currency, shippingFee, getCartTotal } = useContext(ShopContext);

    return (
        <div className='flex border-t-2 border-green text-md md:text-lg'>
            <div className='flex items-center justify-around w-full'>
                <h2 className='flex pt-5 w-1/3'>Subtotal</h2>
                <p className='flex pt-5 w-1/3 justify-end'>{currency}{getCartTotal()}.00</p>
            </div>
        </div>
    )
}

export default CartTotal