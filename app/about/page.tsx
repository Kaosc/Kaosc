import React from "react";

import { SUPPORT_MAIL } from "@/utils/constants";
import Logo from "@/components/Logo";

export default function page() {
  return (
    <div className="flex flex-col min-h-[90vh] items-center justify-evenly text-center bg-gradient-to-r from-black to-zinc-900">
      <Logo disabled className={"absolute self-center opacity-[5%]"} imageClassName={"hover:scale-100"} w={700} h={700} />
      <div
        className="w-1/3 h-full max-lg:w-2/3 max-sm:w-4/5 mx-auto flex flex-col items-center justify-center"
      >
        <h1 className="font-bold text-5xl mb-16 z-10 animate-in slide-in-from-top-14 duration-1000">ABOUT</h1>

        <p
          className={`text-semibold text-xl text-justify z-10 mb-10 max-sm:text-center animate-in slide-in-from-top-10 duration-1000`}
        >
          An individual developer and quiet coder for creating digital
          solutions. With over two years of experience in React and React
          Native, I specialize in developing mobile apps, websites, and web
          apps/extensions.
        </p>

        <p
          className={`text-semibold text-xl text-justify z-10 mb-7 max-sm:text-center animate-in slide-in-from-top-8 duration-1000`}
        >
          My expertise extends to technologies like Tailwind, Redux, Expo, and
          Next.js, primarily focusing on frontend development. Beyond frontend
          development, I also harness Python to craft Selenium web bots for like
          Instagram and Spotify automation.
        </p>

        <p
          className={`text-semibold text-xl text-justify z-10 max-sm:text-center max-md:mb-20 animate-in slide-in-from-top-6 duration-1000`}
        >
          You can contact me anytime at{" "}
          <a href={`mailto:${SUPPORT_MAIL}`} className="inline-link">
            <b>{SUPPORT_MAIL} </b>
          </a>
          or through the{" "}
          <a href="/contact" className="inline-link">
            <b>Contact</b>
          </a>{" "}
          page
        </p>
      </div>
    </div>
  );
}
