import React from 'react'
import { assets } from '../assets/assets'

function Home() {

  return (
    <div className='min-h-custom'>
      <img src={assets.ronin1} className='w-full'/>
      <div className='flex flex-wrap border-t-2 border-ivory'>
        <img src={assets.andy1} className='w-1/3 md:w-1/5'/>
        <img src={assets.andy2} className='w-1/3 md:w-1/5'/>
        <img src={assets.andy3} className='w-1/3 md:w-1/5'/>
        <img src={assets.andy4} className='w-1/5 hidden md:block'/>
        <img src={assets.andy5} className='w-1/5 hidden md:block'/>
      </div>
      <div>
        <div className='border-t-2 border-ivory text-center py-5'>
          <h2 className='text-2xl py-2 px-2'>The Mission</h2>
          <p className='text-md py-2 px-2'>kbveakjbje ekajfsbvilaenvlkn qkbejvak bek jkn svjbk vb kkcnsdkfvk jbvl avjba kejvb kahbvj aebv kbjdbvkjsbkv</p>
        </div>
        <div className='border-t-2 border-ivory'>
          <video loop muted autoPlay src={assets.video1} playsInline/>
        </div>
      </div>
    </div>
  )
}

export default Home