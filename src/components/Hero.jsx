import React from 'react'
import { Button } from './ui/button' // Path check karlein apne folder structure ke hisaab se

const Hero = () => {
  return (
    <section className='bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid md:grid-cols-2 gap-8 items-center'>
          {/* Left Content */}
          <div>
            <h1 className='text-4xl md:text-6xl font-bold mb-4 leading-tight'>
              Latest Electronics at Best Prices
            </h1>
            <p className='text-xl mb-6 text-blue-100'>
              Discover cutting-edge technology with unbeatable deals on smartphones, laptops and more.
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button className='bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3'>
                Shop Now
              </Button>
              <Button variant="outline" className='border-white text-white hover:bg-white hover:text-blue-600 transition-all px-8 py-3 bg-transparent'>
                View Deals
              </Button>
            </div>
          </div>

          {/* Right side Image (Optional space) */}
          <div className='hidden md:block'>
           <img src="/phone.jfif" alt="" />
          </div>
        </div>
      </div>

  
    </section>
  )
}

export default Hero