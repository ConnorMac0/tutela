import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, removeItem, getCartCount, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(()=>{

    const temp = [];
    for(const items in cartItems) {
      for(const item in cartItems[items]){
        if(cartItems[items][item] > 0){
          temp.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setCartData(temp);
  },[cartItems])

  return getCartCount() ? (
    <div className='bg-ivory min-h-full'>
      {cartData.map((item, index)=>{

        const productData = products.find((product)=> product._id === item._id);
        
        return(
          <div key={index} className='flex'>
            <div className='flex gap-6 py-4 pl-10 w-full'>
              <img className='w-16 md:w-32 object-scale-down' src={productData.image[0]}/>
              <div className='flex items-center justify-between w-full'>
                <span className='pl-10'><p className='text-md'>{productData.name}</p><p className='text-xs'>size: {productData.size}</p></span>
                <span className='pr-10'><p className='text-md'>{currency}{productData.price}</p><button onClick={()=>removeItem(productData._id, productData.size)} className='text-xs'>remove</button></span>
              </div>
            </div>  
          </div>
        )
      })}
      <div className=''>
        <CartTotal/>
        <div className='flex w-full p-5 justify-center items-center align-items text-ivory'>
                <button onClick={()=>navigate('/place-order')} className='px-6 py-2 bg-green rounded-full'>Checkout</button>
            </div>
        </div>
    </div>
  ) : <div className='flex justify-center items-center min-h-custom'>Your Cart is Empty</div>
}

export default Cart