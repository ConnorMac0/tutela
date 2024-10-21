import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

function PlaceOrder() {

  const { getCartTotal, shippingFee, currency } = useContext(ShopContext);

  return (
    <div className='flex flex-col md:flex-row min-h-custom md:h-custom p-10 items-center justify-around'>
      <form className='flex flex-col gap-4 pb-5 md:w-1/3 md:p-0 items-center text-sm md:text-base font-sans'>
        <p className='text-2xl md:text-3xl font-main'>Delivery Information</p>
        <span className='flex gap-4 w-full'><input type="text" className="border border-stone-800 py-2 px-4 w-1/2 rounded-none" placeholder='First name' /><input type="text" className="border border-stone-800 py-2 px-4 w-1/2 rounded-none" placeholder='Last name' /></span>
        <input type="email" className="border border-stone-800 py-2 px-4 rounded-none w-full" placeholder='Email' />
        <input type="text" className="border border-stone-800 py-2 px-4 rounded-none w-full" placeholder='Street' />
        <span className='flex gap-4 w-full'><input type="text" className="border border-stone-800 py-2 px-4 w-1/2 rounded-none" placeholder='City' /><input type="text" className="border border-stone-800 py-2 px-4 w-1/2 rounded-none" placeholder='State' /></span>
        <span className='flex gap-4 w-full'><input type="text" className="border border-stone-800 py-2 px-4 w-1/2 rounded-none" placeholder='Zipcode' /><input type="text" className="border border-stone-800 py-2 px-4 w-1/2 rounded-none" placeholder='Country' /></span>
      </form>
      <div className='flex w-full md:w-[2px] h-[2px] md:h-full bg-green'></div>
      <div className='flex flex-col gap-4 md:w-1/3 md:p-0 pt-5 w-full items-center text-sm md:text-base'>
        <p className='text-2xl md:text-3xl'>Cart Total</p>
        <span className='flex justify-between border border-stone-800 bg-white py-2 px-4 w-full'><p>Subtotal</p><p>{currency}{getCartTotal()}.00</p></span>
        <span className='flex justify-between border border-stone-800 bg-white py-2 px-4 w-full'><p>Shipping fee</p><p>{currency}{shippingFee}.00</p></span>
        <span className='flex justify-between border border-stone-800 bg-white py-2 px-4 w-full'><p>Total</p><p>{currency}{getCartTotal() + shippingFee}.00</p></span>
        <button className='bg-green text-ivory py-2 px-4 mt-6 w-2/3 rounded-full justify-center text-lg'>Place Order</button>
      </div>
    </div>
  )
}

export default PlaceOrder