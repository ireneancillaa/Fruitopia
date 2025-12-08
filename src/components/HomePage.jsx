import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import Services from "./Services";
import Banner from "./Banner";
import Products from "./Products";
import Pineapple from "../assets/pineapple.png";

// Hook untuk deteksi element saat scroll
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState({});

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleElements((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll("[data-scroll-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return visibleElements;
};

const BannerData = {
  discount: "25% OFF",
  title: "Fresh Pineapple",
  date: "Limited time offer",
  image: Pineapple,
  title2: "Premium Fruit Selection",
  title3: "Winter Freshness Sale",
  title4:
    "Discover our sweetest and juiciest pineapples. Limited stock available",
  bgColor: "#FFF7D5",
};

// CSS untuk animasi
const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0;
  }

  .fade-in-up.active {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .slide-in-down {
    animation: slideInDown 0.6s ease-out forwards;
  }

  .slide-in-left {
    opacity: 0;
  }

  .slide-in-left.active {
    animation: slideInLeft 0.8s ease-out forwards;
  }

  .slide-in-right {
    opacity: 0;
  }

  .slide-in-right.active {
    animation: slideInRight 0.8s ease-out forwards;
  }

  .scale-in {
    opacity: 0;
  }

  .scale-in.active {
    animation: scaleIn 0.8s ease-out forwards;
  }

  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.3s; }
  .stagger-3 { animation-delay: 0.5s; }
  .stagger-4 { animation-delay: 0.7s; }
`;

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const visibleElements = useScrollAnimation();

  useEffect(() => {
    // Trigger animasi setelah component mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{styles}</style>

      <div className="w-full px-10 sm:px-10 mx-auto">
        <div
          className={`${
            isLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        >
          <div className="slide-in-down stagger-1">
            <Hero />
          </div>

          <div
            id="services-section"
            data-scroll-animate
            className={`fade-in-up stagger-2 ${
              visibleElements["services-section"] ? "active" : ""
            }`}
          >
            <Services />
          </div>

          <div
            id="banner-section"
            data-scroll-animate
            className={`slide-in-left stagger-3 ${
              visibleElements["banner-section"] ? "active" : ""
            }`}
          >
            <Banner data={BannerData} />
          </div>

          <div
            id="products-section"
            data-scroll-animate
            className={`scale-in stagger-4 ${
              visibleElements["products-section"] ? "active" : ""
            }`}
          >
            <Products />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
