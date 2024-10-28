import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';

function PlaceOrder() {

  const { getCartTotal, shippingFee, currency, products, cartItems, backendURL, token, setToken } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {

      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemData = structuredClone(products.find(product => product._id === items))
            if (itemData) {
              itemData.size = item;
              itemData.quantity = cartItems[items][item];
              orderItems.push(itemData);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartTotal() + shippingFee,
      }

      if (!token) {
        try {
          const guestResponse = await axios.post(backendURL + '/api/user/guest', { name: formData.firstName + " " + formData.lastName, email: formData.email });
          
          if (guestResponse.data.success) {
            setToken(guestResponse.data.tempToken);
            localStorage.setItem('token', guestResponse.data.tempToken);

          } else {
            toast.error(guestResponse.data.message, {
              position: "top-center"
            });
            return null;
          }

        } catch (error) {
          console.log(error);
          toast.error(error.message, {
            position: "top-center"
          });
        }
      }
      
      try {

        const response = await axios.post(backendURL + '/api/order/stripe', orderData, { headers: { token: localStorage.getItem('token') } });

        if (response.data.success) {
          const { session_url } = response.data;
          window.location.replace(session_url);
        } else {
          toast.error(response.data.message, {
            position: "top-center"
          });
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.message, {
          position: "top-center"
        });
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center"
      });
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col md:flex-row min-h-custom md:h-custom p-10 items-center justify-around'>
      <div className='flex flex-col gap-4 pb-5 md:w-1/3 md:p-0 items-center text-sm md:text-base font-sans'>
        <p className='text-2xl md:text-3xl font-main'>Delivery Information</p>
        <span className='flex gap-4 w-full'><input onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" className="border border-stone-800 py-2 px-4 w-1/2 rounded-none" placeholder='First name' required /><input onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" className="border border-stone-800 py-2 px-4 w-1/2 rounded-none" placeholder='Last name' required /></span>
        <input onChange={onChangeHandler} name='email' value={formData.email} type="email" className="border border-stone-800 py-2 px-4 rounded-none w-full" placeholder='Email' required />
        <input onChange={onChangeHandler} name='street' value={formData.street} type="text" className="border border-stone-800 py-2 px-4 rounded-none w-full" placeholder='Street' required />
        <span className='flex gap-4 w-full'><input onChange={onChangeHandler} name='city' value={formData.city} type="text" className="border border-stone-800 py-2 px-4 w-1/2 rounded-none" placeholder='City' required /><input onChange={onChangeHandler} name='state' value={formData.state} type="text" className="border border-stone-800 py-2 px-4 w-1/2 rounded-none" placeholder='State' required /></span>
        <span className='flex gap-4 w-full'><input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" className="border border-stone-800 py-2 px-4 w-1/2 rounded-none" placeholder='Zipcode' required /><input onChange={onChangeHandler} name='country' value={formData.country} type="text" className="border border-stone-800 py-2 px-4 w-1/2 rounded-none" placeholder='Country' required /></span>
      </div>
      <div className='flex w-full md:w-[2px] h-[2px] md:h-full bg-green'></div>
      <div className='flex flex-col gap-4 md:w-1/3 md:p-0 pt-5 w-full items-center text-sm md:text-base'>
        <p className='text-2xl md:text-3xl'>Cart Total</p>
        <span className='flex justify-between border-b border-stone-800 py-2 px-4 w-full'><p>Subtotal</p><p>{currency}{getCartTotal()}.00</p></span>
        <span className='flex justify-between border-b border-stone-800 py-2 px-4 w-full'><p>Shipping fee</p><p>{currency}{shippingFee}.00</p></span>
        <span className='flex justify-between py-2 px-4 w-full'><p><b>Total</b></p><p><b>{currency}{getCartTotal() + shippingFee}.00</b></p></span>
        <button type='submit' className='bg-green text-ivory py-2 px-4 mt-6 w-2/3 rounded-full justify-center text-lg'>Place Order</button>
      </div>
    </form>
  )
}

export default PlaceOrder