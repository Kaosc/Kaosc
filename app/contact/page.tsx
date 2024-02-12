import React from "react";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";

import ContactForm from "@/components/ContactForm";
import { SUPPORT_MAIL } from "@/utils/constants";

export default function page() {
  return (
    <div className="flex flex-col min-h-[90vh] items-center justify-evenly text-center bg-gradient-to-r from-black to-zinc-900">
      <h1 className="text-5xl font-bold">CONTACT</h1>
      {/* CONTACT FORM */}
      <div className="w-1/2 text-2xl max-lg:w-[70%] max-lg:text-lg max-sm:w-11/12 max-sm:text-base">
        <Link
          href={`mailto:${SUPPORT_MAIL}`}
          target="_blank"
          role="link"
          className="flex flex-row items-center justify-center mb-6 hover:opacity-50"
        >
          <p className="text-base font-bold mr-2">{SUPPORT_MAIL}</p>
          <AiOutlineMail size={15} />
        </Link>
        <ContactForm />
      </div>
    </div>
  );
}
