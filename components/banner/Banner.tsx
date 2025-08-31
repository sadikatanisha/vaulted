import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-5xl md:text-7xl font-extrabold text-stone-800 text-center md:text-left">
          Discover <br />
          Collect & <br /> Sell Art
        </div>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1579541513287-3f17a5d8d62c?q=80&w=452&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Banner Image"
            width={452}
            height={300}
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
