import { FaArrowDown } from "react-icons/fa";

import ProductsHero from "@/components/product/ProductsHero";
import Tools from "@/components/Tools";
import Logo from "@/components/Logo";

import { products } from "@/data/products";

import { Arsenal } from "next/font/google";

const arsenal = Arsenal({
  weight: ["400"],
  subsets: ["latin-ext"],
});

export default function Home() {
  return (
    <main className="m-0 p-0 flex flex-col items-center">
      <section className="flex flex-col relative min-h-screen w-full justify-between items-center mt-[-10vh] pb-10">
        {/* VIDEO BACKGROUND */}
        <video
          id="home"
          className="absolute w-full h-full object-cover"
          autoPlay
          loop
          muted
          src={"https://i.imgur.com/1xgXyIh.mp4"}
          typeof="video/mp4"
        ></video>

        {/* VIDEO BACKGROUND OVERLAY */}
        <div className="absolute w-full h-full bg-gradient-to-b from-[#000000d2] to-zinc-950"></div>

        {/* TOP SECTION OF HERO */}
        <div className="relative w-[57%] m-auto flex flex-col items-center mt-[10vh]">
          {/* HERO */}
          <div className="flex w-full h-full justify-between items-center max-lg:flex-col mt-20 max-lg:mt-10 max-sm:mt-5">
            {/* LOGO */}
            <Logo className="relative w-[40%] max-2xl:w-[50%] max-md:w-[60%] max-sm:w-[70%] max-mobile:w-[75%] animate-pulse" />

            <div className="flex flex-col items-end text-center">
              {/* TITLE */}
              <h1
                className={`text-6xl max-lg:text-4xl hover:scale-105 max-sm:text-4xl ${arsenal.className} mb-2 tracking-wide animate-in fade-in-0 duration-1000`}
              >
                Kaøsc
              </h1>

              {/* SUBTITLE */}
              <h2 className="font-semibold text-base opacity-60 animate-in fade-in-0 duration-500 max-sm:text-sm">
                INDIVIDUAL DEV
              </h2>

              {/* TOOLS */}
              <Tools />
            </div>
          </div>
        </div>

        {/* EXPLORE PRODUCTS BUTTONS */}
        <div className="items-center justify-center w-full hover:opacity-50 transition-all duration-400 ease-in-out pt-7 px-7 animate-in slide-in-from-bottom-full duration-700">
          <a
            href={`#${products[0].slug}`}
            className="flex flex-col items-center justify-center w-full animate-pulse"
          >
            <h1 className="mt-4 text-4xl text-white max-md:text-2xl max-sm:text-lg text-center">
              Explore Products
            </h1>
            <FaArrowDown size={25} className="mt-2 self-center w-full" />
          </a>
        </div>
      </section>

      <ProductsHero />
    </main>
  );
}
