import React, { useState } from 'react'

function Login() {

  const [currentState, setCurrentState] = useState('Login');

  return (
    <div className="flex min-h-custom justify-center items-center text-ivory">
      <div className="bg-green p-[8%] md:p-[5%] shadow-md shadow-black">
          <h1 className="pb-4 text-3xl text-center"><b>{currentState}</b></h1>
          <form onSubmit="" className='flex flex-col gap-4 w-full'>
              {currentState === 'Login' ? '': <input onChange="{}" className="w-full border border-stone-800 p-2 text-sm text-black" type="text" placeholder="Name" required />}
              <input onChange="{}" className="w-full border border-stone-800 p-2 text-sm text-black" type="email" placeholder="user@email.com" required />
              <input onChange="{}" className="w-full border border-stone-800 p-2 text-sm text-black" type="password" placeholder="Password" required />
              {currentState === 'Sign Up' ? '': <p className='text-xs'>Forgot password? </p>}
              <button className="w-full py-2 bg-black text-white rounded-sm md:rounded-none" type="submit">Login</button>
          </form>
          <div className='justify-end text-xs pt-5'>
                {
                  currentState === 'Login' 
                  ? <div className='flex justify-between'><p>No account? </p><p className="cursor-pointer" onClick={()=>setCurrentState('Sign Up')}> Create account</p></div> 
                  : <div className='flex justify-between'><p>Have an account? </p><p className="cursor-pointer" onClick={()=>setCurrentState('Login')}> Login</p></div>
                }
              </div>
      </div>
    </div>
  )
}

export default Login