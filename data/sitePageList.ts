import { GITHUB_URL } from "@/utils/constants";

export const sitePageList: {
  name: string;
  path: string;
  target?: string;
}[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
  {
    name: "Github",
    target: "_blank",
    path: GITHUB_URL,
  },
];
