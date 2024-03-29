import "./globals.css"

import { Analytics } from "@vercel/analytics/react"

import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import HeaderMargin from "@/components/layout/NavbarMargin"

export const metadata = {
	title: "Kaosc",
	description: "Indie dev that creating products for mobile and web.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link
					rel="icon"
					href="favicon.ico"
				/>
				<meta
					name="google-site-verification"
					content="oZV9oMz8xInRmpVZ3SKxdxLhRQ26GGqaL0dR6uhrrL8"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta
					name="author"
					content="Kaosc"
				/>
				<meta
					name="robots"
					content="index, follow"
				/>
				<meta
					name="description"
					content={metadata.description}
				/>
				<meta
					name="keywords"
					content="kaosc, kaosc dev, kaoscdev"
				/>
				<meta
					name="theme-color"
					content="#000000"
				/>
				<meta
					name="msapplication-TileColor"
					content="#000000"
				/>
				<meta name="darkreader-lock" />
			</head>
			<body
				id="home"
				className="bg-gradient-to-r from-black to-zinc-900"
			>
				<HeaderMargin />
				<Navbar />
				{children}
				<Footer />
				<Analytics />
			</body>
		</html>
	)
}
