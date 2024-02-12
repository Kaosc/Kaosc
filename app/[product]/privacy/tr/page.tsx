import PrivacyView from "@/components/PrivacyView"

export default function Tr({
	params,
}: {
	params: {
		product: string
	}
}) {
	return (
		<PrivacyView
			product={params.product}
			lang={"tr"}
		/>
	)
}
