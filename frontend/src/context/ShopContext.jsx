import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "$";
    const shippingFee = 10;
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

    useEffect(()=>{
        localStorage.setItem('token', token)
      },[token])

    const addToCart = async (itemId, size) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            toast.error("Only 1 item is available for purchase.", {
                position: "top-center"
            });
            return;
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
            toast.success("Item was added to your cart!", {
                position: "top-center"
            });
        }
        setCartItems(cartData);

        if (token) {
            try {

                await axios.post(backendURL + '/api/cart/add', { itemId, size }, { headers: { token } });

            } catch (error) {
                console.log(error);
                toast.error(error.message, {
                    position: "top-center"
                });
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;

        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    try {
                        totalCount += 1;
                    } catch (error) {

                    }
                }
            }
        }
        return totalCount;
    }

    const removeItem = async (itemId, size) => {
        let cartData = structuredClone(cartItems);
        const quantity = 0;

        delete cartData[itemId];

        setCartItems(cartData);

        if (token) {
            try {

                await axios.post(backendURL + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });

            } catch (error) {
                console.log(error);
                toast.error(error.message, {
                    position: "top-center"
                });
            }
        }
    }

    const getCartTotal = () => {
        let cartTotal = 0;

        for (const items in cartItems) {
            let itemData = products.find((product) => product._id === items)
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    try {
                        cartTotal += itemData.price;
                    } catch (error) {

                    }
                }
            }
        }
        return cartTotal;
    }

    const getProductData = async () => {
        try {
            const response = await axios.get(backendURL + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
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
    }

    const getUserCart = async (token) => {
        try {

            const response = await axios.post(backendURL + '/api/cart/get', {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message, {
                position: "top-center"
            });
        }
    }

    useEffect(() => {
        getProductData();
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    }, [])

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const value = {
        products, currency, shippingFee, cartItems,
        addToCart, getCartCount, removeItem, setCartItems,
        getCartTotal, navigate, backendURL, getUserCart,
        toggleMenu, isOpen, token, setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;