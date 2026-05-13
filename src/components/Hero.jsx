import React from 'react'
import { Button } from './ui/button'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const slides = [
  {
    id: 1,
    title: "Latest Electronics at Best Prices",
    desc: "Discover cutting-edge technology with unbeatable deals on smartphones, laptops and more.",
    image: "/phone.jfif"
  },

  {
    id: 2,
    title: "Mega Sale on Laptops",
    desc: "Get high-performance laptops for gaming, coding and office work.",
    image: "/laptop.jpg"
  },

  {
    id: 3,
    title: "Smart Watches Collection",
    desc: "Track fitness, calls and notifications with premium smart watches.",
    image: "/watch.jpg"
  }
]

const Hero = () => {
  return (

    <section className='bg-gradient-to-r from-blue-600 to-purple-600 text-white'>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        className='py-16'
      >

        {slides.map((slide) => (

          <SwiperSlide key={slide.id}>

            <div className='max-w-7xl mx-auto px-4'>

              <div className='grid md:grid-cols-2 gap-8 items-center min-h-[500px]'>

                {/* Left Content */}
                <div>

                  <h1 className='text-4xl md:text-6xl font-bold mb-4 leading-tight'>
                    {slide.title}
                  </h1>

                  <p className='text-xl mb-6 text-blue-100'>
                    {slide.desc}
                  </p>

                  <div className='flex flex-col sm:flex-row gap-4'>

                    <Button className='bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3'>
                      Shop Now
                    </Button>

                    <Button
                      variant="outline"
                      className='border-white text-white hover:bg-white hover:text-blue-600 transition-all px-8 py-3 bg-transparent'
                    >
                      View Deals
                    </Button>

                  </div>
                </div>

                {/* Right Image */}
                <div className='hidden md:flex justify-center'>

                  <img
                    src={slide.image}
                    alt=""
                    className='w-[400px] h-[400px] object-contain drop-shadow-2xl'
                  />

                </div>

              </div>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

    </section>
  )
}

export default Hero