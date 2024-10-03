import React, { createContext, useState } from "react";
import { products } from '../assets/assets'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "$";
    const delivery_fee = 10;
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();

    const addToCart = async (itemId,size) => {
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]) {
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
    }

    const getCartCount = () => {
        let totalCount = 0;

        for(const items in cartItems) {
            for(const item in cartItems[items]){
                if(cartItems[items][item] > 0){
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

        cartData[itemId][size] = 0;
        cartData[itemId] = null;

        setCartItems(cartData);
    }

    const getCartTotal = () => {
        let cartTotal = 0;

        for(const items in cartItems) {
            let itemData = products.find((product)=> product._id === items)
            for(const item in cartItems[items]){
                if(cartItems[items][item] > 0){
                    try {
                        cartTotal += itemData.price;
                    } catch (error) {
                        
                    }
                }
            }
        }
        return cartTotal;
    }

    const value = {
        products, currency, delivery_fee,cartItems, 
        addToCart, getCartCount, removeItem,
        getCartTotal, navigate
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;