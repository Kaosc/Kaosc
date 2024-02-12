import PrivacyView from "@/components/PrivacyView"

export default function Privacy({
	params,
}: {
	params: {
		product: string
	}
}) {
	return <PrivacyView product={params.product} />
}
