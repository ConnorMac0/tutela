import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const ProductItem = ({id, image, name, price}) => {

    const {currency} = useContext(ShopContext);

    return (
        <Link className='flex justify-center cursor-pointer' to={`/product/${id}`}>
            <div className='text-center'>
                <img className='md:size-96 object-scale-down' src={image[0]}/>
                <p className='pt-3 pb-1 text-md md:text-lg'>{name}</p>
                <p className='text-md md:text-lg'>{currency}{price}</p>
            </div>
        </Link>
    )
}

export default ProductItem