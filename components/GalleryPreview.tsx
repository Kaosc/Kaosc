"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { AiOutlineClose } from "react-icons/ai";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function GalleryPreview({
  images,
  setPreviewVisible,
  startIndex,
}: {
  images: string[];
  setPreviewVisible: React.Dispatch<React.SetStateAction<boolean>>;
  startIndex: number;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(startIndex);
  const [imageFade, setImageFade] = useState({
    opacity: "opacity-0",
    duration: "duration-0",
  });
  const [loadingFade, setLoadingFade] = useState({
    opacity: "opacity-0",
    duration: "duration-0",
  });

  const handleChange = useCallback(
    (direction: string) => {
      if (images.length === 1) return;

      setLoadingFade({
        opacity: "opacity-100",
        duration: "duration-500",
      });
      setImageFade({
        opacity: "opacity-0",
        duration: "duration-0",
      });

      if (direction === "next") {
        if (currentImageIndex >= images.length - 1) {
          setCurrentImageIndex(0);
        } else {
          setCurrentImageIndex((prev) => prev + 1);
        }
      }

      if (direction === "prev") {
        if (currentImageIndex === 0) {
          setCurrentImageIndex(images.length - 1);
        } else {
          setCurrentImageIndex((prev) => prev - 1);
        }
      }
    },
    [currentImageIndex, images]
  );

  const keyDownAction = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Q" || e.key === "q")
        setPreviewVisible(false);
      if (e.key === "ArrowRight" || e.key === "D" || e.key === "d")
        handleChange("next");
      if (e.key === "ArrowLeft" || e.key === "A" || e.key === "a")
        handleChange("prev");
    },
    [handleChange, setPreviewVisible]
  );

  useEffect(() => {
    addEventListener("keydown", keyDownAction);
    return () => removeEventListener("keydown", keyDownAction);
  }, [keyDownAction]);

  const ChangeImageButton = ({ direction }: { direction: string }) => {
    return (
      <button
        onClick={() => handleChange(direction)}
        className="text-6xl m-4 rounded-xl p-1 hover:opacity-70 hover:scale-110 text-zinc-300"
      >
        {direction === "next" ? (
          <FaArrowRight size={50} />
        ) : (
          <FaArrowLeft size={50} />
        )}
      </button>
    );
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setPreviewVisible(false);
  };

  const handleOnLoad = () => {
    setLoadingFade({
      opacity: "opacity-0",
      duration: "duration-0",
    });
    setImageFade({
      opacity: "opacity-100",
      duration: "duration-500",
    });
  };

  return (
    <div className="fixed flex top-0 left-0 w-screen h-screen bg-[#000000e1] z-20 items-center justify-center">
      <div
        onClick={handleOutsideClick}
        className="flex w-full h-full m-auto justify-center items-center p-10 max-md:flex-col max-md:p-0"
      >
        {/* CLOSE BUTTON */}
        <div className="absolute top-0 right-0 z-30">
          <button
            type="button"
            onClick={() => setPreviewVisible(false)}
            className="text-6xl text-zinc-300 m-4 rounded-xl p-1 hover:opacity-70 hover:scale-110"
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* PREV BUTTON */}
        {images.length > 1 && (
          <div className="max-md:hidden">
            <ChangeImageButton direction={"prev"} />
          </div>
        )}

        {/* LOADING INDICATOR */}
        <div
          className={`absolute self-center ease-in-out ${loadingFade.duration} ${loadingFade.opacity} delay-300`}
        >
          <div className="flex items-center justify-center">
            <div className="w-3 h-12 border-2 border-zinc-300 rounded-full animate-spin delay-300"></div>
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative h-full w-2/3 m-10 max-md:w-11/12 max-md:bottom-12">
          <Image
            alt="gallery"
            src={images[currentImageIndex]}
            loading="eager"
            priority
            onLoad={handleOnLoad}
            fill
            className={`object-contain ease-in-out ${imageFade.duration} ${imageFade.opacity} `}
          />
        </div>

        {/* NEXT BUTTON */}
        {images.length > 1 && (
          <div className="max-md:hidden">
            <ChangeImageButton direction={"next"} />
          </div>
        )}

        {/* MOBILE PREV/NEXT BUTTONS */}
        <div className="max-md:flex hidden absolute bottom-12">
          <ChangeImageButton direction={"prev"} />
          <ChangeImageButton direction={"next"} />
        </div>
      </div>
    </div>
  );
}
