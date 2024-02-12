import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaYoutube } from "react-icons/fa";

import { products } from "@/data/products";

import Divider from "@/components/ui/Divider";
import ProductImages from "@/components/product/ProductImages";
import ProductExternalLink from "@/components/product/ProductExternalLink";

export default function Project({ params }: { params: { product: string } }) {
  const projectDB =
    products.find((item: Product) => item.slug === params.product) || null;

  return (
    <div className="flex items-center justify-evenly text-center bg-gradient-to-r from-black to-zinc-900 max-lg:h-full">
      {!projectDB ? (
        // NO PRODUCT FOUND
        <div className="flex items-center justify-center h-[65vh]">
          <h2 className="text-4xl max-md:text-2xl">
            This product is not exit | 404
          </h2>
        </div>
      ) : (
        <div className="flex min-h-[90vh] justify-start items-center max-[1300px]:flex-col max-[1300px]:h-full pb-20">
          {/* Left Side */}
          <div className="flex flex-col items-center justify-center w-2/4 max-[1300px]:w-full">
            {/* app logo */}
            <Image
              src={projectDB.logo}
              alt={projectDB.name}
              width={240}
              height={240}
              className={`self-center max-[1300px]:mt-10 max-sm:w-2/5 rounded-3xl 
              ${projectDB?.styles?.shadow && "shadow-xl shadow-zinc-900"}
              ${projectDB?.styles?.fullRadious && "rounded-full"}
              `}
            />

            <Divider className="w-full h-8" />

            {/* product name */}
            <h1 className="font-bold text-4xl">{projectDB.name}</h1>

            <Divider className="w-full h-8" />

            {/* product desc */}
            <p className="w-3/5 text-center text-2xl max-sm:text-xl">
              {projectDB.description}
            </p>

            {(projectDB.instagramUrl || projectDB.youtubeUrl) && (
              <>
                <Divider className="w-full h-10" />
                <div className="flex">
                  {/* instagram link */}
                  {projectDB?.instagramUrl && (
                    <div className="flex items-center justify-center hover:opacity-50 hover:animate-pulse transition-all ease-in-out hover:scale-110 duration-300">
                      <Link
                        href={projectDB.instagramUrl}
                        target="”_blank”"
                        className="text-lg uppercase font-semibold"
                      ></Link>
                      <FaInstagram className="mr-6" size={36} />
                    </div>
                  )}

                  {/* youtube */}
                  {projectDB?.youtubeUrl && (
                    <div className="flex items-center justify-center hover:opacity-50 hover:animate-pulse transition-all ease-in-out hover:scale-110 duration-300">
                      <Link
                        href={projectDB.youtubeUrl}
                        target="”_blank”"
                        className="text-lg uppercase font-semibold"
                      >
                        <FaYoutube className="mr-2" size={45} />
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}

            <ProductExternalLink
              type={projectDB.type}
              storeUrl={projectDB.storeUrl}
            />

            <Divider className="w-full h-8" />
          </div>

          {/* screenshots */}
          <ProductImages projectDB={projectDB} />
        </div>
      )}
    </div>
  );
}
