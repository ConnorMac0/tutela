import React, { useContext } from 'react'
import ProductItem from '../components/ProductItem';
import { ShopContext } from '../context/ShopContext';

const Shop = () => {

  const { products } = useContext(ShopContext);

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-5 p-10'>
      {products.map((product, index) => (
        <ProductItem key={index} name={product.name} id={product._id} image={product.image} price={product.price}/>
      ))}
    </div>
  )
}

export default Shop