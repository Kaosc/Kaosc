import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";
import { FaGithub} from "react-icons/fa";

import { GITHUB_URL } from "@/utils/constants";

export default function Socials({ isContact = false }) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center">
        <Link href={GITHUB_URL} target="”_blank”">
          <FaGithub size={28} className="hover:opacity-50 mr-5" />
        </Link>
      </div>
      {!isContact && (
        <div className="flex items-center justify-center">
          <Link href="/contact" target="”_blank”">
            <AiOutlineMail size={34} className="hover:opacity-50" />
          </Link>
        </div>
      )}
    </div>
  );
}
