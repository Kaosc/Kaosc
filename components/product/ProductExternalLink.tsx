import React from "react";
import Link from "next/link";

import { HiOutlineExternalLink } from "react-icons/hi";

import PlayStoreLogo from "@/components/PlayStoreLogo";
import { productTypeTitle } from "@/utils/getProductTitle";

export default function ProductExternalLink({
  type,
  storeUrl,
}: {
  type: ProductType;
  storeUrl: string;
}) {
  if (type === "mobile") {
    return <PlayStoreLogo url={storeUrl} />;
  } else {
    return (
      <Link
        href={storeUrl}
        target="_blank"
        className="flex w-[50%] max-sm:w-[65%] max-2xl:w-[30%] items-center justify-center animate-pulse mt-7"
      >
        <div className="items-center justify-center p-7 max-2xl:py-[17px] max-md:py-3 max-sm:px-7 bg-zinc-900 duration-500 rounded-full hover:opacity-70 hover:scale-110 transition-all ease-in-out ring-2 ring-zinc-800">
          <div className="flex items-center justify-center">
            <HiOutlineExternalLink className="mr-2" size={23} />
            <h2 className="text-2xl text-zinc-300 max-2xl:text-lg max-sm:text-xs uppercase font-semibold">
              {productTypeTitle(type)}
            </h2>
          </div>
        </div>
      </Link>
    );
  }
}
