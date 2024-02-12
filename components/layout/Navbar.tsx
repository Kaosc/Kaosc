"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

import { useWindowScroll } from "react-use"
import { FaGithub, FaArrowLeft } from "react-icons/fa"

import useScrollDirection from "@/hooks/useScrollDirection"
import { GITHUB_URL } from "@/utils/constants"
import { products } from "@/data/products"

export default function Navbar() {
	const windowScrollPosition = useWindowScroll()
	const scrollDirection = useScrollDirection()
	const pathname = usePathname()

	const productSlugs = products.map((p) => p.to.split("/")[1])

	const styles: {
		[key: string]: React.HtmlHTMLAttributes<HTMLAnchorElement>["className"]
	} = {
		linkText:
			"text-md max-lg:text-sm max-sm:text-xs hover:opacity-50 transition-all duration-400 ease-in-out",
	}

	return (
		<div
			className="absolute w-full top-0 z-20 transition-all duration-300 from-[#000000e1] to-[#18181b] backdrop-blur-sm"
			style={{
				position: windowScrollPosition.y === 0 ? "relative" : "fixed",
				transform: scrollDirection === "down" ? "translateY(-100%)" : "translateY(0)",
			}}
		>
			<div className="flex h-[10vh] self-center items-center justify-evenly">
				{pathname === "/" && (
					<div className="flex items-center hover:opacity-50 transition-all duration-400 ease-in-out">
						<Link
							href={GITHUB_URL}
							target="_blank"
							about="Contact"
							className={styles.linkText}
						>
							GITHUB
						</Link>

						<FaGithub className="ml-2 text-[19px] max-sm:text-[14px]" />
					</div>
				)}

				{pathname.match(/privacy|about|terms/) && pathname !== "/about" && (
					<div className="flex items-center hover:opacity-50">
						<FaArrowLeft
							size={18}
							className="mr-2"
						/>
						<Link
							href={`/${pathname.split("/")[1]}`}
							className={styles.linkText}
						>
							BACK
						</Link>
					</div>
				)}

				{pathname !== "/" && (
					<Link
						href="/"
						className={styles.linkText}
					>
						HOME
					</Link>
				)}

				{pathname === "/" && (
					<a href={`#${products[0].slug}`}>
						<p className={styles.linkText}>PRODUCTS</p>
					</a>
				)}

				{pathname !== "/about" && !productSlugs.includes(pathname.split("/")[1]) && (
					<Link
						href="/about"
						className={styles.linkText}
					>
						ABOUT
					</Link>
				)}

				{pathname === "/quickcopy" && (
					<Link
						href="/quickcopy/about"
						className={styles.linkText}
					>
						ABOUT APP
					</Link>
				)}

				{(pathname === "/quickcopy" || pathname === "/driverbook") && (
					<Link
          href={`${pathname}/terms`}
						className={styles.linkText}
					>
						TERMS OF USE
					</Link>
				)}

				{(pathname === "/quickcopy" || pathname === "/driverbook" || pathname === "/bookmarkhub") && (
					<Link
						href={`${pathname}/privacy`}
						about="PRIVACY POLICY"
						className={styles.linkText}
					>
						PRIVACY POLICY
					</Link>
				)}

				{pathname !== "/contact" && (
					<Link
						href="/contact"
						className={styles.linkText}
					>
						CONTACT
					</Link>
				)}
			</div>
		</div>
	)
}
