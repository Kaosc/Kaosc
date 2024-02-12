import { GOOGLE_PLAY_LOGO } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

export default function PlayStore({ url }: { url: string }) {
  return (
    <Link
      href={url}
      target="_blank"
      className="flex hover:scale-110 hover:animate-pulse transition-all ease-in-out items-center justify-center mt-8"
    >
      <Image
        src={GOOGLE_PLAY_LOGO}
        alt="playstore"
        width={290}
        height={92}
        className="h-auto w-auto max-md:w-[70%] max-2xl:w-[80%]"
      />
    </Link>
  );
}
