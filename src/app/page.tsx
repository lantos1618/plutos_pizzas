import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";



import React from 'react';

function AppBar() {
  return (
    <nav className="sticky top-0 z-50 bg-blue-600 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold">Pluto Pizzas</div>
          <div className="space-x-4">
            <a href="#about" className="text-white">About Us</a>
            <a href="#contact" className="text-white">Contact</a>
            <a href="#order" className="text-white">Order</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function HeroLanding() {
  return (
    <section className="relative h-screen bg-fit bg-fixed" style={{ backgroundImage: 'url(https://cdn.discordapp.com/attachments/1115663218048774277/1168545336906756157/DALLE_2023-10-30_13.41.43_-_Photo_of_a_top-down_view_of_a_simple_pizza_directly_placed_against_a_dark_infinity_wall_background._The_pizza_has_basic_toppings_like_cheese_and_tomat.png)' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold">Pluto Pizzas</h1>
        <p className="mt-4 text-2xl">Taste the Universe</p>
      </div>
    </section>
  );
}

function OrderSection() {
  return (
    <section id="order" className="p-10">
      {/* Your Order Content */}
    </section>
  );
}

function AboutUs() {
  return (
    <section id="about" className="p-10">
      {/* Your About Us Content */}
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="p-10">
      {/* Your Contact Content */}
    </section>
  );
}


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar />
      <HeroLanding />
      <OrderSection />
      <AboutUs />
      <Contact />
    </div>
  );
}