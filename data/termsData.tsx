import { SUPPORT_MAIL } from "@/utils/constants"

export const TermsData: PrivacyData = [
	{
		title: "TERMS OF USE",
		desc: 'These Terms of Use ("Terms") outline the terms and conditions under which you may use the Quick Copy mobile application ("App"). By downloading, installing, or using the App, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use the App.',
	},
	{
		title: "Acceptance of Terms",
		desc: "By using the Quick Copy App, you agree to these Terms and any future updates. These Terms may be updated without notice, and your continued use of the App after any changes constitutes your acceptance of the new Terms",
	},
	{
		title: "Use of the App",
		desc: "a. Quick Copy is a clipboard manager designed to enhance your copy and paste experience on your device.\n\nb. Users can back up their clipboard items to Google Drive by signing in with their Google account.\n\n c. No account creation option is provided within the App, and personal information is not collected as there is no database for storage.",
	},
	{
		title: "Updates to Privacy Policy",
		desc: () => (
			<div>
				Our Privacy Policy may undergo periodic updates. As we do not collect user information, it is not
				feasible for us to directly notify you of policy changes. Therefore, we recommend revisiting this page
				periodically to stay informed about any updates. This policy is effective as of{" "}
				<span className="inline-link"> 2023/01/25 </span>
			</div>
		),
	},
	{
		title: "Contact Us",
		desc: () => (
			<div>
				If you have any questions or suggestions regarding our Privacy Policy, please feel free to reach out
				to us at
				<a
					href={`mailto:${SUPPORT_MAIL}`}
					target="_blank"
					className="inline-link"
				>
					{" "}
					{SUPPORT_MAIL}
				</a>
			</div>
		),
	},
]
