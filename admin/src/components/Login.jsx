import React, { useState } from "react";
import axios from 'axios';
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {

    const [email, setEmail] = useState('');
    const [password, setPasword] = useState('');

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password });

            if (response.data.success) {
                setToken(response.data.token)
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

    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="bg-green p-[8%] md:p-[5%] shadow-md shadow-black">
                <h1 className="mb-3 text-3xl text-center"><b>Tutela Admin</b></h1>
                <form onSubmit={onSubmitHandler}>
                    <div className="w-full py-2">
                        <p className="text-md">Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} className="w-full border border-stone-800 p-2 text-sm" type="email" value={email} placeholder="user@email.com" required />
                    </div>
                    <div className="w-full py-2">
                        <p className="text-md">Password</p>
                        <input onChange={(e) => setPasword(e.target.value)} className="w-full border border-stone-800 p-2 text-sm" type="password" value={password} placeholder="password" required />
                    </div>
                    <button className="w-full mt-3 py-2 bg-black text-white rounded-sm md:rounded-none" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;