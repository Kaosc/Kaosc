import Image from "next/image";

import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import { products } from "@/data/products";

import Divider from "@/components/ui/Divider";
import ProductExternalLink from "@/components/product/ProductExternalLink";
import ProductImages from "./ProductImages";

export default function ProductsHero() {
  return (
    <div
      className="flex flex-col bg-gradient-to-b from-zinc-950 to-[#030303] px-24 max-2xl:px-2"
    >
      {products.map((product, index) => {
        const nextHref = products[index + 1]?.slug;

        return (
          <div key={index}>
            <div
              id={product?.slug}
              className="flex max-2xl:p-0 flex-col justify-evenly items-center min-h-screen w-full max-2xl:flex-col"
            >
              {/* TOP SIDE */}
              <a
                href={product.to}
                className="flex flex-col max-2xl:ml-0 max-2xl:self-center self-start
                transition-all duration-500 ease-in-out hover:opacity-80 hover:scale-105
              "
              >
                <div className="flex items-center max-2xl:justify-center max-2xl:mb-10">
                  {/* LOGO */}
                  <div className="flex flex-col items-center justify-center max-md:w-[70px] max-mobile:w-[30%]">
                    <Image
                      src={product.logo}
                      alt="Quick Copy"
                      width={100}
                      height={100}
                      className={` mr-5 
                    ${product?.styles?.radious && "rounded-2xl"} 
                    ${product?.styles?.fullRadious && "rounded-full"} 
                    ${product.styles?.shadow && "shadow-xl shadow-zinc-900"}`}
                    />
                  </div>

                  {/* TITLE */}
                  <h2
                    className="text-center text-6xl font-semibold 
                  max-mobile:text-xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl"
                  >
                    {product.name}
                  </h2>
                </div>
              </a>

              {/* BOTTOM SIDE */}
              <div className="flex w-full items-center justify-between max-2xl:flex-col">

                {/* IMAGES */}
                <ProductImages
                  projectDB={product}
                  containerClassName="mt-12 max-2xl:mt-0"
                />

                {/* DESCRIPTION */}
                <div
                  className={`flex flex-col items-center justify-center w-[55%] max-2xl:w-full max-2xl:flex-row max-md:flex-col ${
                    product.slug === "hyletheme" && "w-[30%]"
                  }`}
                >
                  <p className="text-center p-6 text-[30px] max-2xl:mt-10 max-md:text-xl max-2xl:w-1/3 max-md:w-[90%] max-2xl:text-2xl">
                    {product.description}
                  </p>

                  <ProductExternalLink
                    type={product.type}
                    storeUrl={product.storeUrl}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center h-10 w-full mt-10 hover:opacity-70 hover:scale-125 transition-all duration-500 ease-in-out">
                <a
                  className="animate-bounce duration-1000"
                  href={nextHref ? `#${nextHref}` : "#home"}
                >
                  {nextHref ? (
                    <FaArrowDown size={35} />
                  ) : (
                    <FaArrowUp size={35} />
                  )}
                </a>
              </div>
            </div>

            {index !== products.length - 1 ? (
              <Divider className="h-[1px] w-[72%] self-start max-2xl:self-center max-2xl:ml-0 my-10 bg-gradient-to-r from-zinc-600 to-neutral-900" />
            ) : (
              <div className="mb-7"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
