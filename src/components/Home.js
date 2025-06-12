// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import HomeSlider from './HomeSlider';
import TeamSection from './TeamMembers';

const Home = () => {
  return (
    <div className="font-sans bg-gradient-to-b from-blue-50 to-white text-blue-900">
      {/* Hero Section */}
      <div
        className="relative h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/CollegeBoy.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4 backdrop-blur-md">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-white border-opacity-20 animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
              Welcome to <span className="text-yellow-400">EthiCraft Club</span>
            </h1>
            <p className="text-lg md:text-2xl max-w-2xl mb-6 text-white text-opacity-90">
              Wisdom with Purpose. Leadership with Values.
            </p>
            <Link
              to="/register"
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="my-16 px-4">
        <HomeSlider />
      </div>

      {/* About Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">About Us</h2>
        <p className="text-gray-800 text-lg leading-relaxed bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-md">
          Our club is dedicated to empowering youth to embrace the importance of values in everyday life. We inspire future leaders committed to creating a better India and promoting lasting peace globally. Join us in our mission to transform hearts and minds for a brighter future!
        </p>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-blue-100/30 backdrop-blur-sm">
        <h2 className="text-4xl font-bold text-center mb-10">Club Activities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
          {['/TreePlant.jpg', '/Presentation.jpg', '/StudyCircles.jpg'].map((src, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 bg-white bg-opacity-30 backdrop-blur-lg border border-white border-opacity-20"
            >
              <img
                src={src}
                alt={`Activity ${i + 1}`}
                className="w-full h-64 object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <div className="my-16 px-4">
        <TeamSection />
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center py-6 mt-16 shadow-inner">
        <p className="text-sm">
          &copy; 2025 <span className="font-semibold">EthiCraft</span>. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
