import React, { useContext } from 'react'
import {ShopContext} from '../context/ShopContext'

function Orders() {

  const {products, currency} = useContext(ShopContext);

  return (
    <div className='border-t pt-8 px-8'>
      <div className='text-2xl'>
        <h1>ORDERS</h1>
      </div>
      <div>
        {
          products.slice(1,4).map((item,index)=>(
            <div key={index} className='py-4 border-t-2 border-green text-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className="w-20 md:w-16" src={item.image[0]} alt="" />
                <div>
                  <p className='text-base'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-800'>
                    <p className='text-lg'>{currency}{item.price}.00</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p>Date: <span className='text-gray-400'>{Date(item.date)}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between items-center'>
                <div className='flex items-center align-items gap-2'>
                  <p className='text-sm md:text-base'>READY TO SHIP</p>
                </div>
                <button className='border border-green px-4 py-2 text-sm'>TRACK ORDER</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders