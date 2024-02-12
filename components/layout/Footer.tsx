"use client";

import React, { useCallback } from "react";
import { usePathname } from "next/navigation";

import { sitePageList } from "@/data/sitePageList";

import Socials from "@/components/Socials";
import { products } from "@/data/products";
import Divider from "../ui/Divider";

export default function Footer() {
  const isHome = usePathname() === "/" ? true : false;
  const isContact = usePathname() === "/contact" ? true : false;

  const Link = useCallback(
    ({
      text,
      href,
      target,
      index,
      small,
    }: {
      text: string;
      href: string;
      target?: string;
      index: number;
      small?: boolean;
    }) => {
      const textColor = index % 2 === 1 ? "text-zinc-400" : "text-gray-500";

      return (
        <a
          href={href}
          target={target || "_self"}
          className="hover:opacity-80 ml-3 transition-all text-gray-500 duration-500 ease-in-out hover:underline "
        >
          <p
            className={`text-left ${textColor} hover:text-white ${
              small ? "" : "text-lg"
            }`}
          >
            {" "}
            {text}{" "}
          </p>
        </a>
      );
    },
    []
  );

  return (
    <div
      className={`flex flex-col min-h-[350px] w-full items-center p-4 justify-around border-t-2 border-zinc-700 ${
        isHome
          ? "bg-gradient-to-b from-[#000000d2] to-zinc-950"
          : "bg-gradient-to-r from-black to-zinc-900"
      }`}
    >
      <div
        className={`flex w-full items-center max-md:flex-col max-md:min-h-[420px] ${
          isContact ? "justify-center" : "justify-around"
        }`}
      >
        {/* PAGES */}
        <section
          className={`flex flex-wrap marker:items-center justify-start w-[13%] max-md:justify-center max-md:w-[90%]`}
        >
          {sitePageList.map((page, index) => (
            <Link
              key={index}
              index={index}
              text={page.name}
              href={page.path}
              target={page.target}
            />
          ))}
        </section>

        {/* SOCIALS */}
        <section
          className={`flex items-center justify-center ${
            isContact ? "hidden" : "flex"
          }`}
        >
          <Socials />
        </section>

        {isContact && (
          <Divider className="bg-zinc-800 w-[40%] h-[0.1px] hidden max-md:flex my-10" />
        )}

        {/* PRODUCTS */}
        <section
          className={`flex flex-wrap items-center justify-start w-[13%] max-md:w-[70%] max-md:justify-center`}
        >
          {products.map((product, index) => (
            <Link
              small
              key={index}
              index={index}
              text={product.name}
              href={product.to}
            />
          ))}
        </section>
      </div>
      <h4 className="mt-10">Kaosc @ {new Date().getFullYear().toString()}</h4>
    </div>
  );
}
