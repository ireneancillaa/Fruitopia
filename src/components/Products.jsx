import React, { useEffect, useState, useRef } from 'react'
import supabase from '../utils/supabase'

const productCardStyles = `
  @keyframes productSlideIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(15px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .product-card-animate {
    opacity: 0;
    animation: productSlideIn 0.6s ease-out forwards;
  }

  .product-scroll-animate {
    opacity: 0;
    transform: scale(0.95) translateY(15px);
    transition: all 0.6s ease-out;
  }

  .product-scroll-animate.visible {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`

const Products = () => {
  const [productData, setProductData] = useState([])
  const [animatingCards, setAnimatingCards] = useState({})
  const [visibleOnScroll, setVisibleOnScroll] = useState({})
  const containerRef = useRef(null)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('fruits')
        .select('image_url, name, price, id')
        .in('id', [1, 2, 3, 4, 5, 6, 7, 8])

      if (!error && data) {
        setProductData(data)
      }
    }
    fetchProducts()
  }, [])

  // Initial load animation
  useEffect(() => {
    productData.forEach((product, index) => {
      setTimeout(() => {
        setAnimatingCards(prev => ({ ...prev, [product.id]: true }))
      }, index * 100) // 100ms stagger antara card
    })
  }, [productData])

  // Scroll animation setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const productId = entry.target.dataset.productId
            setVisibleOnScroll(prev => ({ ...prev, [productId]: true }))
          }
        })
      },
      { threshold: 0.2 }
    )

    const cards = containerRef.current?.querySelectorAll('[data-product-id]')
    cards?.forEach(card => observer.observe(card))

    return () => {
      cards?.forEach(card => observer.unobserve(card))
    }
  }, [productData])


  return (
    <>
      <style>{productCardStyles}</style>
      <div className="container mx-auto px-1 md:px-2 max-w-screen-2xl my-14 md:my-20">
        <div className="text-center mb-10 max-w-[600px] mx-auto space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-black">
            Our Products
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Explore our wide range of fresh and delicious fruits, handpicked for you.
          </p>
        </div>
        <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {productData.map((item) => (
            <div
              key={item.id}
              data-product-id={item.id}
              className={`p-3 rounded-lg product-scroll-animate ${
                animatingCards[item.id] ? '' : 'opacity-0'
              } ${visibleOnScroll[item.id] ? 'visible' : ''}`}
            >
              <div className="relative w-full h-50 bg-gray-100 flex items-center justify-center rounded-2xl overflow-hidden group">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-50 h-50 object-cover rounded transition-all duration-300"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-full group-hover:translate-y-0 transition-all duration-300 bg-[#007E6E] opacity-60 space-y-3">

                <button className="text-white font-semibold py-2 px-6 transition-all duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
              <h2 className="font-semibold text-xl mt-2 text-left">
                {item.name}
              </h2>
              <p className="text-gray-600 text-sm font-regular text-left">
                Rp {new Intl.NumberFormat('id-ID').format(item.price)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Products