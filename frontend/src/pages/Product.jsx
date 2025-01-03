import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

function Product() {

  const { productId } = useParams();
  const { products, currency, addToCart, navigate } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [images, setImages] = useState([]);

  const fetchProductData = async () => {
    products.map((product) => {
      if (product._id === productId) {
        setProductData(product);
        setImages(product.image);
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  const [imageIndex, setImageIndex] = useState(0);

  return productData ? (
    <div className='flex flex-col md:flex-row min-h-custom'>

      {/*--- Product Images ---*/}
      <div className='flex w-full max-h-custom justify-center flex-col items-center'>
        <img onClick={()=>setImageIndex((prevIndex) => (prevIndex + 1) % images.length)} className='h-[400px] object-scale-down cursor-pointer' src={images[imageIndex]} />
        <div className='flex p-10'>
          <img onClick={()=>setImageIndex((prevIndex) => (prevIndex + 1) % images.length)} className={`w-12 object-scale-down cursor-pointer ${!imageIndex ? "border-2 border-green" : ""}`} src={images[0]} alt="" />
          <img onClick={()=>setImageIndex((prevIndex) => (prevIndex + 1) % images.length)} className={`w-12 object-scale-down cursor-pointer ${imageIndex ? "border-2 border-green" : ""} ${images.length < 2 ? "hidden" : ""}`} src={images[1]} alt="" />
        </div>
      </div>

      {/*--- Product Details ---*/}
      <div className='flex flex-col w-full justify-center items-center text-center'>
        <h1 className='text-4xl pt-5'>{productData.name}</h1>
        <p className='text-2xl p-2'>{currency}{productData.price}</p>
        <p className='text-xl pb-4'>{productData.size}</p>
        <button onClick={() => {addToCart(productData._id, productData.size); navigate('/shop')}} className='text-xl bg-green px-10 p-1 text-ivory rounded-full mb-5'>Add to Cart</button>
        <p className='hidden text-xl p-4 md:block'>{productData.description}</p>
      </div>
    </div>

  ) : <div className='opacity-0'></div>
}

export default Product