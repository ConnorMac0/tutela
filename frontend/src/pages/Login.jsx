import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendURL, getCartCount } = useContext(ShopContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === 'Sign Up') {

        /* User Registration API handling */
        const response = await axios.post(backendURL + '/api/user/register', { name: firstName + " " + lastName, email, password })
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message, {
            position: "top-center"
          });
        }

        /* User Login API handling */
      } else {
        const response = await axios.post(backendURL + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message, {
            position: "top-center"
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center"
      });
    }
  }

  useEffect(()=>{
    if (token) {
      if (getCartCount() > 0) {
        navigate('/place-order');
      } else {
        navigate('/');
      }
    }
  }, [token])

  return (
    <div className="flex min-h-custom justify-center items-center text-ivory">
      <div className="bg-green p-[8%] md:p-[5%] shadow-md shadow-black">
        <h1 className="pb-4 text-3xl text-center"><b>{currentState}</b></h1>
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-4 w-full font-serif'>
          {currentState === 'Login' ? '' : 
          <span className='flex gap-2'><input onChange={(e) => setFirstName(e.target.value)} value={firstName} className="w-full border border-stone-800 py-2 px-4 text-sm text-black" type="text" placeholder="First Name" required />
          <input onChange={(e) => setLastName(e.target.value)} value={lastName} className="w-full border border-stone-800 py-2 px-4 text-sm text-black" type="text" placeholder="Last Name" required /></span>
          }
          <input onChange={(e) => setEmail(e.target.value)} value={email} className="w-full border border-stone-800 py-2 px-4 text-sm text-black" type="email" placeholder="User@email.com" required />
          <input onChange={(e) => setPassword(e.target.value)} value={password} className="w-full border border-stone-800 py-2 px-4 text-sm text-black" type="password" placeholder="Password" required />
          {currentState === 'Sign Up' ? '' : <p className='text-xs'>Forgot password? </p>}
          <button className="w-full py-2 bg-black text-white rounded-sm md:rounded-none" type="submit">{currentState === 'Login' ? 'Login' : 'Sign Up'}</button>
        </form>
        <div className='justify-end text-xs pt-5'>
          {
            currentState === 'Login'
              ? <div className='flex justify-between'><p>No account? </p><p className="cursor-pointer" onClick={() => setCurrentState('Sign Up')}> Create account</p></div>
              : <div className='flex justify-between'><p>Have an account? </p><p className="cursor-pointer" onClick={() => setCurrentState('Login')}> Login</p></div>
          }
        </div>
      </div>
    </div>
  )
}

export default Login