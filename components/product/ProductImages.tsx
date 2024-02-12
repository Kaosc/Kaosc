"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import GalleryPreview from "../GalleryPreview";

export default function ProductImages({
  projectDB,
  containerClassName,
  imageContainerClassName,
}: {
  projectDB: Product;
  containerClassName?: React.HtmlHTMLAttributes<HTMLDivElement>["className"];
  imageContainerClassName?: React.HtmlHTMLAttributes<HTMLDivElement>["className"];
}) {
  const [loading, setLoading] = useState(true);
  const [galleryVisible, setGalleryVisible] = useState(false);

  const currentImageIndext = useRef(0);

  const handleGalleryVisible = (index: number) => {
    currentImageIndext.current = index;
    setGalleryVisible(true);
  };

  return (
    <>
      {galleryVisible && (
        <GalleryPreview
          images={projectDB.screenshots.list}
          startIndex={currentImageIndext.current}
          setPreviewVisible={setGalleryVisible}
        />
      )}
      <div
        className={`flex max-2xl:flex-wrap max-2xl:justify-center ${containerClassName}`}
      >
        {projectDB.screenshots.list.map((url: string, index: number) => {
          if (index >= projectDB.showableImageLimit) return null;
          return (
            <div
              key={index}
              onClick={() => handleGalleryVisible(index)}
              className={`relative inline-block max-2xl:max-w-[70%] max-md:max-w-[90%] max-sm:p-0 max-sm:m-2 items-center justify-start max-2xl:justify-center hover:scale-105 duration-1000 ${imageContainerClassName} ${
                loading
                  ? "max-sm:h-full animate-pulse bg-gradient-to-r from-zinc-900 to-zinc-950 rounded-[50px] mx-[15px]"
                  : "animate-in fade-in-0 mx-[3px]"
              } `}
            >
              <Image
                src={url}
                priority
                width={projectDB.screenshots.width}
                height={projectDB.screenshots.height}
                alt={"screenshot"}
                onLoad={() => setLoading(false)}
                className={` 
                max-md:px-5 px-1 rounded-[25px] transition-all ease-in-out animate-in fade-in-0
                ${!loading ? "opacity-100" : "opacity-0"}`}
              />
              <div className="absolute top-0 left-0 bottom-0 right-0 bg-transparent rounded-[30px] transition-all ease-in-out shadow-2xl hover:shadow-zinc-600 shadow-zinc-800 animate-pulse duration-4000"></div>
            </div>
          );
        })}
      </div>
    </>
  );
}
