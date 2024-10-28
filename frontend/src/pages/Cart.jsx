import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, removeItem, getCartCount, navigate, token } = useContext(ShopContext);
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

  const onClickHandler = () => {
    if (!token) {
      navigate('/checkout');
    } else {
      navigate('/place-order');
    }
  }

  return getCartCount() ? (
    <div className='bg-ivory min-h-full'>
      {cartData.map((item, index)=>{

        const productData = products.find((product)=> product._id === item._id);
        
        return(
          <div key={index} className='flex'>
            <div className='flex py-4 w-full'>          
              <div className='flex items-center justify-around w-full'>
                <img className='w-16 md:w-32 object-scale-down' src={productData.image[0]}/>
                <span className='flex flex-col gap-2 justify-center items-center'><p className='text-md md:text-xl'>{productData.name}</p><p className='text-xs md:text-base'>Size: {productData.size}</p></span>
                <p className='text-md md:text-xl'>{currency}{productData.price}</p>
                <button onClick={()=>removeItem(productData._id, productData.size)} className='text-xs md:text-base'><i className="fa-solid fa-trash text-right"></i></button>
              </div>
            </div>  
          </div>
        )
      })}
      <div className=''>
        <CartTotal/>
        <div className='flex w-full p-5 justify-center items-center align-items text-ivory'>
              <button onClick={()=>onClickHandler()} className='px-6 py-2 bg-green w-1/2 md:w-1/5 rounded-full'>CHECKOUT</button>
            </div>
        </div>
    </div>
  ) : <div className='flex justify-center items-center min-h-custom'>Your Cart is Empty</div>
}

export default Cart