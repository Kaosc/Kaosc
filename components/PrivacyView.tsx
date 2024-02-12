import Link from "next/link"

import { privacyData } from "@/data/privacyData"
import { privacyDataTR } from "@/data/privacyDataTR"

export default function PrivacyView({ product, lang }: { product: string; lang?: string }) {
	const data = lang === "tr" ? privacyDataTR : privacyData

	const PrivacyTitle = ({ item }: { item: any }) => {
		const { title, desc } = item
		if (title && (typeof desc === "string" || typeof desc === "function" || desc[product])) {
			return <h1 className="mb-9 mt-10 text-center text-4xl font-bold">{title}</h1>
		}
		return null
	}

	const PrivacyArticle = ({ item }: { item: any }) => {
		const { desc } = item

		if (typeof desc === "string") {
			return <div className="my-10 text-white">{desc}</div>
		} else if (typeof desc === "function") {
			return <div className="my-10 text-white">{desc()}</div>
		} else {
			if (desc[product]) {
				if (typeof desc[product] === "string") {
					return <div className="my-5 text-white"> {desc[product]}</div>
				} else if (typeof desc[product] === "function") {
					return desc[product]()
				} else {
					return desc[product].map((item: any, index: number) => {
						return (
							<div key={"desclist" + index}>
								<div className="my-10 text-left text-3xl font-semibold">{item.title}</div>
								<div className="my-5 text-white">{item.desc}</div>
								{item.list && (
									<div>
										{item.list.map((item: any, index: number) => {
											return <p key={"desc-li" + index}>• {item}</p>
										})}
									</div>
								)}
							</div>
						)
					})
				}
			}
		}
	}

	const PrivacyUrlList = ({ item }: { item: any }) => {
		const { urlList } = item

		if (urlList && urlList[product]) {
			return (
				<div>
					<h1 className="text-xl font-semibold mb-4">{urlList[product].title}</h1>
					<ul>
						{urlList[product].list.map((item: any, index: number) => {
							return (
								<li key={"thirdpartyurl" + index}>
									<Link
										href={item.url}
										target="_blank"
										className="inline-link"
									>
										• {item.title}
									</Link>
								</li>
							)
						})}
					</ul>
				</div>
			)
		}
		return null
	}

	return (
		<div className="flex flex-col items-center justify-evenly text-justify bg-gradient-to-r from-black to-zinc-900">
			{data.map((item: any, index: number) => {
				return (
					<div
						key={"article" + index}
						className="w-1/2 max-lg:w-[70%] max-sm:w-10/12 max-sm:text-base"
					>
						<PrivacyTitle item={item} />
						<PrivacyArticle item={item} />
						<PrivacyUrlList item={item} />
					</div>
				)
			})}
		</div>
	)
}
