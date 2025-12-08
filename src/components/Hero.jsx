import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Apple from '../assets/apple.png'
import Durian from '../assets/durian.png'
import Pomegranate from '../assets/pomegranate.png'
import Pineapple from '../assets/pineapple.png'

const HeroData = [
  {
    id: 111,
    img: Apple,
    subtitle: 'Best Buy',
    title: 'Fresh',
    title2: 'Apple'
  },
  {
    id: 222,
    img: Durian,
    subtitle: 'Best Buy',
    title: 'Fresh',
    title2: 'Durian'
  },
  {
    id: 333,
    img: Pomegranate,
    subtitle: 'Best Buy',
    title: 'Fresh',
    title2: 'Pomegranate'
  },
  {
    id: 444,
    img: Pineapple,
    subtitle: 'Best Buy',
    title: 'Fresh',
    title2: 'Pineapple'
  }
]

const Hero = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 4000,
    cssEase: 'ease-in-out',
    pauseOnHover: true,
    pauseOnFocus: true,
    autoplay: true
  }

  return (
    <div className="container mx-auto px-1 md:px-2 max-w-screen-2xl">
      <div className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] bg-[#d4eee0] flex justify-center items-center">
        <div className="container pb-8 sm:pb-0">
          <Slider {...settings}>
            {HeroData.map((data) => (
              <div key={data.id} className="py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-6 px-4">
                  <div className="flex flex-col justify-center gap-4 pl-4 sm:pl-10 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                    <h1 className="text-2xl sm:text-6xl lg:text-2xl font-bold text-gray-900">
                      {data.subtitle}
                    </h1>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                      {data.title}
                    </h1>
                    <h1 className="text-4xl uppercase text-white sm:text-[70px] md:text-[90px] xl:text-[135px] font-bold">
                      {data.title2}
                    </h1>
                    <div className="mt-4">
                      <Link
                        to="/shop"
                        className="inline-block px-6 py-3 text-lg font-semibold border border-[#007E6E] text-[#007E6E] rounded-md transition-all duration-300 hover:bg-[#007E6E] hover:text-white"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>

                  <div className="order-1 sm:order-2">
                    <div className="flex justify-center">
                      <img
                        src={data.img}
                        alt={data.title2}
                        className="w-[340px] sm:w-[460px] h-[340px] sm:h-[480px] sm:scale-110 lg:scale-130 object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] relative z-40"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Hero