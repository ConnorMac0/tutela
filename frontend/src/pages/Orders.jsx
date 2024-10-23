import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';

function Orders() {

  const { backendURL, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([])

  const loadOrders = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(backendURL + '/api/order/userOrders', {}, { headers: { token } })
      if (response.data.success) {
        let allOrders = [];
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrders.push(item);
          })
        })
        setOrderData(allOrders.reverse())
      }   

    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center"
      });      
    }
  }

  useEffect(() => {
    loadOrders()
  }, [token])

  return (
    <div className='border-t pt-8 px-8'>
      <div className='text-2xl'>
        <h1>ORDERS</h1>
      </div>
      <div>
        {
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t-2 border-green text-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className="w-20 md:w-16" src={item.image[0]} alt="" />
                <div>
                  <p className='text-base'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-gray-800'>
                    <p className='text-lg'>{currency}{item.price}.00</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between items-center'>
                <div className='flex items-center align-items gap-2'>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={loadOrders} className='border border-green px-4 py-2 text-sm'>TRACK ORDER</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders