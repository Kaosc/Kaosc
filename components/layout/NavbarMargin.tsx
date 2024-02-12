"use client"

import { useWindowScroll } from "react-use"

export default function NavbarMargin() {
	const windowScrollPosition = useWindowScroll()
	return <div className={`${windowScrollPosition.y === 0 ? "h-0" : "h-[10vh]"}`}></div>
}
