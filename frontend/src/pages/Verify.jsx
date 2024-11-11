import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {

    const { navigate, token, setCartItems, backendURL, getUserCart} = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null;
            }

            const response = await axios.post(backendURL + '/api/order/verifyPayment', { success, orderId }, { headers: { token } })
            if (response.data.success) {
                setCartItems({});
                navigate('/orders');
            } else {
                getUserCart(localStorage.getItem('token'));
                navigate('/cart');
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message, {
                position: "top-center"
              });   
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token])

    return (
        <div>
            Verifying Payment
        </div>
    )
}

export default Verify