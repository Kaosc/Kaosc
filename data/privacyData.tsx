import { SUPPORT_MAIL } from "@/utils/constants"

export const privacyData: PrivacyData = [
	{
		title: "PRIVACY POLICY",
		desc: "This page informs visitors about our policies regarding the collection, use, and disclosure of Personal Information for those using our service. By choosing to use our service, you agree to the collection and use of information as outlined in this policy. The collected Personal Information is utilized for providing and enhancing the service. Your information will not be used or shared with anyone except as described in this Privacy Policy.",
	},
	{
		title: "Information Collection and Use",
		desc: "To enhance your experience with our service, we may ask you to provide certain personally identifiable information. It's important to note that the information we request is retained on your device and is not collected by us in any manner. However, please be aware that our app utilizes third-party services which may collect information for identification purposes.",
	},
	{
		title: "Type of Data Collected",
		desc: {
			driverbook: [
				{
					title: "Personal Data",
					desc: "During your use of our service, we may request personally identifiable information, also known as Personal Data, that can be used to contact or identify you. This may encompass, but is not limited to:",
					list: ["Android Advertising ID"],
				},
				{
					title: "Usage Data",
					desc: "We'd like to inform you that in the event of an error within our app, we collect data and information, referred to as Log Data, through third-party products on your device. This Log Data may encompass details such as your device's Internet Protocol (“IP”) address, device name, operating system version, app configuration during service utilization, the timestamp of your service usage, and other relevant statistics.",
				},
			],
			quickcopy: [
				{
					title: "Personal Data",
					desc: "During your use of our service, we may request personally identifiable information, also known as Personal Data, that can be used to contact or identify you. This may encompass, but is not limited to:",
					list: ["Android Advertising ID"],
				},
				{
					title: "Usage Data",
					desc: "We'd like to inform you that in the event of an error within our app, we collect data and information, referred to as Log Data, through third-party products on your device. This Log Data may encompass details such as your device's Internet Protocol (“IP”) address, device name, operating system version, app configuration during service utilization, the timestamp of your service usage, and other relevant statistics.",
				},
			],
			bookmarkhub: [
				{
					title: null,
					desc: "Our Chrome extension app may collect certain types of usage data to improve its functionality and provide you with a better experience. Usage data is essential for us to understand how you interact with our extension and to make necessary enhancements. We want to be transparent about the data we collect, so here's what you need to know:",
				},
				{
					title: "Usage Statistics",
					desc: "We may collect anonymous usage statistics about your interactions with the extension. This includes information on which features you use most frequently, how long you spend using the extension, and any errors or crashes that occur during your usage. This data is aggregated and anonymized, ensuring that your personal information is never linked to these statistics.",
				},
				{
					title: "Extension Settings",
					desc: "We may collect information related to your selected extension settings and preferences. This helps us tailor the extension to your individual preferences and improve its overall usability.",
				},
				{
					title: "Browser Information",
					desc: "We may collect limited browser information, such as the version of Chrome you are using and your operating system. This helps us ensure compatibility and optimize the extension for different platforms.",
				},
				{
					title: "Device Information",
					desc: "We may collect device-related information, including your device type, screen resolution, and hardware specifications. This information aids us in optimizing the extension's performance on various devices.",
				},
				{
					title: "Log Data",
					desc: "Like most websites and software applications, our extension may log certain data when you use it. This may include your IP address, browser user-agent, and timestamps. We use this information for troubleshooting, security, and analytics purposes.",
				},
			],
		},
	},
	{
		title: "Security",
		desc: {
			driverbook:
				"We appreciate the trust you place in us by providing your Personal Information. To safeguard it, we employ commercially acceptable means. However, it's important to note that no method of transmission over the internet or electronic storage is completely secure and reliable, and we cannot guarantee its absolute security.",
			quickcopy: () => (
				<div>
					At our core, we prioritize your privacy and security. Safeguarding your clipboard data is our
					commitment. We present users with an end-to-end encryption feature, ensuring that your clipboard
					data remains encrypted from start to finish, with exclusive access granted only to you. Delve into
					the details in the{" "}
					<a
						href="/quickcopy/about"
						target="_blank"
						className="inline-link"
					>
						About
					</a>{" "}
					section of the app to learn more about this feature.
					<br />
					<br />
					Without the use of our end-to-end encryption during the Google Drive backup process, your data may
					not be fully secured during transit. We want to emphasize that we cannot be held responsible for any
					data loss or compromise under these circumstances.
					<br />
					<br />
					Rest assured, your data is solely stored on your device and is not shared or collected by any
					third-party services or companies. Importantly, our app operates without requiring any login. You
					have the freedom to use our app without creating an account. However, if you opt to utilize our
					backup feature, a Google Drive account login is necessary. It's worth noting that we do not collect
					any personal information, such as your name or email, from you.
				</div>
			),
			bookmarkhub:
				"We prioritize the security of your data. Our Chrome does not offer any encryption or guarantee the safety of your bookmarks. Please make sure that you are not storing any sensitive data in app by willingly. Currently your bookmark data stored localy on your device and not shared with any third party services. We offers our user to backup and restore their bookmarks by their own. We do not store any data on our servers. it's important to note that no system is entirely immune to security threats. Therefore users are advised to use this app at their own risk.",
		},
	},
	{
		title: "Service Providers",
		desc: {
			driverbook: [
				{
					title: null,
					desc: "To enhance and support our Service, I may engage third-party companies and individuals for various reasons: facilitating our Service, providing the Service on our behalf, performing Service-related services, and assisting in the analysis of how our Service is used. It's important to inform users that these third parties have access to your Personal Information strictly for the purpose of executing tasks assigned to them on our behalf. They are, however, obligated not to disclose or use the information for any other purpose. Please review the privacy policies of these third-party service providers to understand how they handle your personal information.",
				},
			],
			quickcopy: [
				{
					title: null,
					desc: "To enhance and support our Service, I may engage third-party companies and individuals for various reasons: facilitating our Service, providing the Service on our behalf, performing Service-related services, and assisting in the analysis of how our Service is used. It's important to inform users that these third parties have access to your Personal Information strictly for the purpose of executing tasks assigned to them on our behalf. They are, however, obligated not to disclose or use the information for any other purpose. Please review the privacy policies of these third-party service providers to understand how they handle your personal information.",
				},
			],
			bookmarkhub: null,
		},
		urlList: {
			driverbook: {
				title: "Links to privacy policy of third-party service providers used by the app",
				list: [
					{
						title: "AdMob",
						url: "https://support.google.com/admob/answer/6128543?hl=en",
					},
					{
						title: "Google Play Service",
						url: "https://policies.google.com/privacy?hl=en-US",
					},
					{
						title: "Google Analytics",
						url: "https://analytics.google.com/analytics/web/",
					},
					{
						title: "Pangle",
						url: "https://www.pangleglobal.com/privacy/enduser-en",
					},
					{
						title: "AdColony",
						url: "https://www.adcolony.com/consumer-privacy/",
					},
					{
						title: "Applovin",
						url: "https://www.applovin.com/privacy/",
					},
					{
						title: "Liftoff Monetize",
						url: "https://privacy.liftoff.io/",
					},
					{
						title: "Mintegral",
						url: "https://www.mintegral.com/en/privacy",
					},
				],
			},
			quickcopy: {
				title: "Links to privacy policy of third-party service providers used by the app",
				list: [
					{
						title: "AdMob",
						url: "https://support.google.com/admob/answer/6128543?hl=en",
					},
					{
						title: "Google Drive API",
						url: "https://support.google.com/drive/answer/2450387?hl=en",
					},
					{
						title: "Google OAuth2",
						url: "https://policies.google.com/privacy?hl=en-US",
					},
					{
						title: "Google Play Service",
						url: "https://policies.google.com/privacy?hl=en-US",
					},
					{
						title: "Google Analytics",
						url: "https://analytics.google.com/analytics/web/",
					},
					{
						title: "Pangle",
						url: "https://www.pangleglobal.com/privacy/enduser-en",
					},
					{
						title: "AdColony",
						url: "https://www.adcolony.com/consumer-privacy/",
					},
					{
						title: "Applovin",
						url: "https://www.applovin.com/privacy/",
					},
					{
						title: "Liftoff Monetize",
						url: "https://privacy.liftoff.io/",
					},
					{
						title: "Mintegral",
						url: "https://www.mintegral.com/en/privacy",
					},
				],
			},
		},
	},
	{
		title: "External Links Disclaimer",
		desc: "This Service may include links to other sites. Clicking on a third-party link will redirect you to that site. It's crucial to note that these external sites are not operated by me. Consequently, I strongly recommend reviewing the Privacy Policy of these websites. I have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites or services.",
	},
	{
		title: "Children's Privacy",
		desc: "Our Service is not intended for individuals under the age of 13, and we do not knowingly collect personally identifiable information from anyone in this age group. Since we do not collect any personal information, we do not have any knowledge of the age of our users. Therefore we advise parents and guardians to monitor their children's online activities to prevent the collection of personal information from anyone under the age of 13.",
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
