"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from 'react';
import { useEffect } from "react";

export function AppBar() {
  const [scrollY, setScrollY] = useState(0);
  const [background, setBackground] = useState("rgba(0,0,0,0)");

  // make the background fade in when scrolling down

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const alpha = Math.min(.5,  scrollY / 200);
    const rgb = "0,0,0";
    if (scrollY > 0) {
      setBackground(`rgba(${rgb},${alpha})`);
    } else {
      setBackground(`rgba(${rgb},0)`);
    }
  }, [scrollY])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 text-white" style={{background}}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image src={"/images/logo.png"} width={32} height={32} alt={"logo"} />
            <div className="font-bold font-rounded">Pluto Pizzas</div>
          </div>
          <div className="space-x-4">
            <Link href="#about">About Us</Link>
            <Link href="#contact">Contact</Link>
            {/* <Link href="#order">Order</Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
