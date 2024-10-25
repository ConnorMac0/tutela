import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Products = ({token}) => {

    const [list, setList] = useState([])

    const fetchList = async () => {
        try {

            const response = await axios.get(backendUrl + '/api/product/list');
            console.log(response.data);
            
            if (response.data.success) {
                setList(response.data.products);            
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

    const removeProduct = async (id) => {
        try {

            const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers:{token}});
            console.log(response.data);
            
            if (response.data.success) {
                toast.success(response.data.message, {
                    position: "top-center"
                  });
                await fetchList();            
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

    useEffect(()=>{
        fetchList();
    },[])

    return (
        <div className="p-5">
            <div className="flex flex-col gap-2">
                <div className="hidden md:grid grid-cols-5 p-1 items-center">
                    <b></b>
                    <b>Name</b>
                    <b>Price</b>
                    <b>Size</b>
                    <b className="text-center">Action</b>
                </div>
            </div>
            {
                list.map((item,index)=> {
                    if (index === 0) {
                        return (
                            <div className="grid grid-cols-5 py-5 items-center md:border-t-2 md:border-green" key={index}>
                                <img className="w-12 md:w-14" src={item.image[0]} alt="" />
                                <p>{item.name}</p>
                                <p>{currency}{item.price}.00</p>
                                <p>{item.size}</p>
                                <button onClick={()=>removeProduct(item._id)}><i className="fa-solid fa-trash text-right"></i></button>
                            </div>
                            )
                    } else {
                        return (
                            <div className="grid grid-cols-5 py-5 items-center border-t-2 border-green" key={index}>
                                <img className="w-12 md:w-14" src={item.image[0]} alt="" />
                                <p>{item.name}</p>
                                <p>{currency}{item.price}.00</p>
                                <p>{item.size}</p>
                                <button onClick={()=>removeProduct(item._id)}><i className="fa-solid fa-trash text-right"></i></button>
                            </div>)}
                })
            }
        </div>
    )
}

export default Products;