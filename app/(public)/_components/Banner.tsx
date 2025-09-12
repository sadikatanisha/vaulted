"use client";
import React from "react";
import Image from "next/image";

const Banner = () => {
  const products = [
    {
      name: "Cloudstone Beige",
      price: "£29.99",
      dimensions: "300mm × 600mm | 5mm",
      img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1045&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Noir Aurum",
      price: "£42.50",
      dimensions: "600mm × 600mm | 8mm",
      img: "https://images.unsplash.com/photo-1579541814924-49fef17c5be5?q=80&w=970&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Ash Drift",
      price: "£27.00",
      dimensions: "300mm × 600mm | 6mm",
      img: "https://images.unsplash.com/photo-1577083165633-14ebcdb0f658?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Storm Ember",
      price: "£49.99",
      dimensions: "600mm × 900mm | 10mm",
      img: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="bg-[#E6E0D6] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between">
          <div className="">
            <h1 className="text-5xl md:text-6xl font-playfair text-[#2F2D26] leading-tight">
              A Curated Selection <br /> of Exceptional{" "}
              <span className="italic">Art.</span>
            </h1>
          </div>

          <div className="flex-1 max-w-xl">
            <p className="mt-4 text-[#6B675E] text-lg">
              Serving residential and commercial spaces across the UK with
              professional flooring solutions that last.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button className="bg-[#444233] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#5A5746] transition">
                Book a Free Quote
              </button>
              <button className="border border-[#444233] text-[#2F2D26] px-6 py-3 rounded-lg hover:bg-[#F7F5F0] transition">
                Learn more about us
              </button>
            </div>
          </div>
        </div>
        {/* headline + subtext */}
        <div className="">
          <h2 className="font-medium text-2xl text-stone-700 py-4">
            Signature Collection
          </h2>
          {/* image cards */}
          <div className="grid grid-cols-4 gap-6">
            {products.map((p, idx) => (
              <div
                key={idx}
                className="bg-[#F7F5F0] rounded-lg overflow-hidden shadow-sm p-1"
              >
                <Image
                  src={p.img}
                  alt={p.name}
                  width={400}
                  height={600}
                  className="w-full h-65 object-cover rounded-md"
                />
                <div className="p-2 ">
                  <div className="flex justify-between ">
                    <p className="font-md text-stone-600 text-sm">{p.name}</p>
                    <p className="font-bold text-stone-700 text-sm">
                      {p.price}
                    </p>
                  </div>

                  <p className="text-xs text-[#6B675E] mt-2  border-t-stone-400 border-1">
                    {p.dimensions}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
