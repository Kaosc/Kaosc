import React from "react";
import Image from "next/image";
import Link from "next/link";

import { products } from "@/data/products";

export default function ProductsList() {
  return (
    <div className="flex flex-wrap items-center justify-evenly max-lg:w-auto max-lg:justify-center max-sm:w-1/2 ">
      {products.map((product, index) => (
        <Link
          key={index}
          href={product.to}
          className="flex flex-col items-center p-3 hover:scale-105 transition-all duration-500 ease-in-out hover:animate-pulse hover:opacity-80"
          target={product?.target || "_self"}
        >
          <Image
            src={product.logo}
            alt="Quick Copy"
            width={100}
            height={100}
            className={`max-sm:w-[90%] max-sm:h-auto ${
              product?.styles?.fullRadious ? "rounded-full" : "rounded-[35px]"
            } ${product.styles?.shadow && "shadow-xl shadow-zinc-900"}`}
          />
          <h2 className="text-center text-[20px] max-mobile:text-xl mt-5">
            {product.name}
          </h2>
        </Link>
      ))}
    </div>
  );
}
