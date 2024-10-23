import React, { useEffect, useState } from "react";
import axios from 'axios';
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const Orders = ({ token }) => {

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {

        if (!token) {
            return null;
        }
        try {
            const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
            if (response.data.success) {
                console.log(response.data)
                setOrders(response.data.orders)
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

    const statusHandler = async (e, orderId) => {
        try {
            
            const response = await axios.post(backendUrl + '/api/order/status', {orderId, status:e.target.value}, {headers:{token}});
            if (response.data.success) {
                await fetchOrders();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message, {
                position: "top-center"
            });
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [token])

    return (
        <div className="flex flex-col gap-5 p-5 min-h-mobile md:min-h-desktop">
            {
                orders.map((order, index) => (
                    <div className="border-2 border-green p-5 bg-white" key={index}>
                        <div className="flex flex-col md:flex-row items-center justify-around pb-5 border-b-2 border-green">
                            <div className="flex flex-col gap-2 md:w-1/3 pb-5 border-b-2 border-green md:p-0 md:border-none">
                                {order.items.map((item, index) => (
                                    <div className="flex items-center grid grid-cols-4 justify-between" key={index}>
                                        <img className="w-12 md:w-14" src={item.image[0]} alt="" />
                                        <p>{item.name}</p>
                                        <p>{item.size}</p>
                                        <p>{currency}{item.price}.00</p>
                                    </div>
                                ))}
                            </div>
                            <div className="md:w-1/3 pt-5 md:p-0">
                                <h1 className="text-xl">Order Details:</h1>
                                <div className="flex flex-col p-3">
                                    <p><b>Name:</b> {order.address.firstName + " " + order.address.lastName}</p>
                                    <p><b>Email: </b>{order.address.email}</p>
                                    <p><b>Address: </b>{order.address.street}</p>
                                    <p><b>City: </b>{order.address.city}</p>
                                    <p><b>State: </b>{order.address.state}</p>
                                    <p><b>Zipcode: </b>{order.address.zipcode}</p>
                                    <p><b>Country: </b>{order.address.country}</p>
                                    <p><b>Payment: </b>{order.payment ? 'Paid' : 'Pending'}</p>
                                    <p><b>Date: </b>{new Date(order.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row w-full pt-5 gap-5 justify-around">
                            <select onChange={(e)=>statusHandler(e, order._id)} value={order.status} name="" id="" className="w-full md:w-1/4 p-2 rounded-none">
                                <option value="Order Placed">Order Placed</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                            <button className="bg-green p-2 w-full md:w-1/4 text-ivory">Create Shipping Label</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Orders;