import { EGG } from "@/utils/constants"
import Image from "next/image"

export default function Logo({
	className = "",
	imageClassName = "",
	w = 450,
	h = 450,
	disabled = false,
}: {
	className?: React.HTMLAttributes<HTMLDivElement>["className"]
	w?: number
	h?: number
	imageClassName?: React.HTMLAttributes<HTMLImageElement>["className"]
	disabled?: boolean
}) {
	return (
		<div className={className}>
			<a
				href={disabled ? undefined : EGG}
				target="_blank"
				rel="noopener noreferrer"
				className="relative"
			>
				<Image
					src="/assets/logo.png"
					alt="Logo"
					height={w}
					width={h}
					className={`${
						!disabled && "hover:scale-110"
					} transition-all ease-in-out duration-1000 animate-in fade-in-0 ${imageClassName}`}
					fetchPriority="high"
					priority
				/>
			</a>
		</div>
	)
}
