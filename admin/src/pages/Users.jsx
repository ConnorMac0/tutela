import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Users = ({ token }) => {

    const [list, setList] = useState([])

    const fetchList = async () => {
        try {

            const response = await axios.get(backendUrl + '/api/user/list');
            console.log(response.data);

            if (response.data.success) {
                setList(response.data.users);
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

    const removeUser = async (id) => {
        try {

            const response = await axios.post(backendUrl + '/api/user/remove', { id }, { headers: { token } });
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

    useEffect(() => {
        fetchList();
    }, [])

    return (
        <div className="p-5">
            <div className="flex flex-col gap-2">
                <div className="hidden md:grid grid-cols-4 p-1 items-center">
                    <b>Name</b>
                    <b>Email</b>
                    <b>Role</b>
                    <b className="text-center">Action</b>
                </div>
            </div>
            {
                list.map((user, index) => {
                    if (index === 0) {
                        return (
                            <div className="grid grid-cols-4 py-5 items-center md:border-t-2 md:border-green" key={index}>
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                                <p>{user.role}</p>
                                <button onClick={() => removeUser(user._id)}><i className="fa-solid fa-trash text-right"></i></button>
                            </div>
                        )
                    } else {
                        return (
                            <div className="grid grid-cols-4 py-5 items-center border-t-2 border-green" key={index}>
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                                <p>{user.role}</p>
                                <button onClick={() => removeUser(user._id)}><i className="fa-solid fa-trash text-right"></i></button>
                            </div>)
                    }
                })
            }
        </div>
    )
}

export default Users;