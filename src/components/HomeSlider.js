// src/HomeSlider.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const HomeSlider = () => {
  const slides = [
    {
      img: "/GrpPhoto.jpeg",
      caption: "Unity in Purpose – Our Ethicraft Family"
    },
    {
      img: "/EthiCraft1.jpg",
      caption: "Empowering Youth with Values"
      
    },
    {
      img: "/Ph1.jpg",
      caption: "Inspiring Leadership through Action"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 px-4">
      <div className="rounded-3xl border border-white/20 shadow-xl bg-white/20 backdrop-blur-lg overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          effect="fade"
          pagination={{ clickable: true }}
          navigation={true}
          className="rounded-3xl"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-[70vh]">
                <div
                  className="absolute inset-0 bg-center bg-cover transition-all duration-700"
                  style={{ backgroundImage: `url('${slide.img}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-3xl" />

                {/* Caption */}
                <div className="absolute bottom-8 left-8 text-white z-10">
                  <h3 className="text-xl md:text-2xl font-semibold drop-shadow-md bg-black/40 px-4 py-2 rounded-xl">
                    {slide.caption}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;
