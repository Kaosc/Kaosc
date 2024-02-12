import Link from "next/link";
import {
  SiExpo,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiRedux,
} from "react-icons/si";

export default function Tools() {
  const hover = "hover:opacity-50 transition-all duration-400 ease-in-out ml-6";
  const mainIconStyle = "self-center w-full text-[47px] max-sm:text-[35px]";
  const otherIconStyle = "self-center w-full";

  return (
    <>
      <h1 className="mt-12 text-3xl font-bold justify-between animate-in fade-in-0 duration-300 max-sm:text-2xl">
        Tools
      </h1>

      {/* LIST */}
      <div className="flex flex-col w-fit">
        {/* MAIN TOOLS */}
        <div className="flex w-full justify-end mt-5 animate-in fade-in-0 duration-500">
          {[
            {
              href: "https://react.dev/",
              icon: <SiReact color="#b8b8b8" className={mainIconStyle} />,
              text: "React",
            },
            {
              href: "https://reactnative.dev/",
              icon: <SiReact color="#b8b8b8" className={mainIconStyle} />,
              text: "React Native",
            },
            {
              href: "https://nextjs.org/",
              icon: <SiNextdotjs color="#b8b8b8" className={mainIconStyle} />,
              text: "Next.js",
            },
          ].map((tool, index) => (
            <Link key={index} href={tool.href} target="blank" className={hover}>
              {tool.icon}
              <p className="text-[14px] mt-1 text-neutral-400 max-sm:text-[12px]">
                {tool.text}
              </p>
            </Link>
          ))}
        </div>

        {/* OTHER TOOLS */}
        <div className="flex flex-row mt-3 items-center justify-between animate-in fade-in-0 duration-1000 max-sm:justify-end">
          {[
            {
              href: "https://tailwindcss.com/",
              icon: (
                <SiTailwindcss
                  color="#b8b8b8"
                  className={`${otherIconStyle} mb-[-5px] text-[39px] max-sm:text-[32px]`}
                />
              ),
              text: "TailWind",
            },
            {
              href: "https://expo.dev/",
              icon: (
                <SiExpo
                  color="#b8b8b8"
                  className={`${otherIconStyle} mt-1 text-[30px] max-sm:text-[23px]`}
                />
              ),
              text: "Expo",
            },
            {
              href: "https://www.typescriptlang.org/",
              icon: (
                <SiTypescript
                  color="#b8b8b8"
                  className={`${otherIconStyle} mt-[10px] text-[24px] max-sm:text-[18px]`}
                />
              ),
              text: "TypeScript",
            },
            {
              href: "https://redux.js.org/",
              icon: (
                <SiRedux
                  color="#b8b8b8"
                  className={`${otherIconStyle} mt-2 text-[26px] max-sm:text-[19px]`}
                />
              ),
              text: "Redux",
            },
          ].map((tool, index) => (
            <Link key={index} href={tool.href} target="blank" className={hover}>
              {tool.icon}
              <p className="text-[14px] mt-2 text-neutral-400 max-sm:text-[11px]">
                {tool.text}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
