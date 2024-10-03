import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {

    const { currency, delivery_fee, getCartTotal } = useContext(ShopContext);

    return (
        <div className='flex flex-col border-t-2 border-black'>
            <div className='flex items-center justify-between w-full'>
                <h2 className='pt-5 px-10'>Subtotal</h2>
                <p className='pt-5 px-10'>{currency}{getCartTotal()}.00</p>
            </div>
        </div>
    )
}

export default CartTotal