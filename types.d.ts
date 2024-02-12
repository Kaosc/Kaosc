type Product = {
	slug: string
	name: string
	logo: string
	to: string
	storeUrl: string
	target?: string
	styles?: {
		radious?: boolean
		fullRadious?: boolean
		shadow?: boolean
	}
	screenshots: {
		width: number
		height: number
		list: string[]
	}
	instagramUrl?: string
	youtubeUrl?: string
	description: string
	type: ProductType
	showableImageLimit: number
}

type ProductType = "app" | "extension" | "web" | "mobile" | "bot"

type Products = "driverbook" | "quickcopy" | "bookmarkhub"

type PrivacyData = {
	title: string
	desc:
		| string
		| {
				[key: Products]:
					| {
							title: string
							desc: string | JSX.Element
							list: string[]
					  }[]
					| null
					| string
					| JSX.Element
		  }
	urlList?: {
		[key: Products]: {
			title: string
			list: {
				title: string
				url: string
			}[]
		}
	}
}[]
