import Image from "next/image"
import Link from "next/link"

import { SUPPORT_MAIL } from "@/utils/constants"

export default function About() {
	return (
		<div className="flex flex-col items-center justify-evenly text-center bg-gradient-to-r from-black to-zinc-900">
			<div className="w-1/2 text-2xl max-lg:w-[70%] max-lg:text-lg max-sm:w-11/12 max-sm:text-base text-justify">
				{/* TITLE */}
				<h1 className="font-bold text-5xl mb-16 mt-7 text-center">ABOUT</h1>

				{/* LOGO */}
				<Image
					src="/assets/products/quickcopy/logo.png"
					alt="logo"
					height={170}
					width={170}
					className="block m-auto mb-9 rounded-3xl shadow-xl shadow-zinc-800"
				/>

				<h2 className="my-9 mt-24 text-center text-4xl font-bold"> What It Does </h2>

				<p>
					Quick Copy holds the clipboard items from added by user and allow the copy them directly or share
					with other apps. You can select a type depending on item to redirect to other apps. Adding tags to
					items could help you to easly find what you looking for. Finally Quick Copy allows you to export
					your all items as XLSX, DOCX, TXT and JSON file.
				</p>

				<h2 className="my-9 mt-24 text-center text-4xl font-bold"> Data Safety </h2>

				<p>
					Quick Copy does not collect and share any of your personal data. The items you add to the app are
					stored in your phones storage. In case you lose access to your phone, you can backup your items to
					your Google Drive account. Quick Copy uses Google OAuth2 for authenticate the user, which Quick Copy
					could not get this informations without your permission. When you logged into Quick Copy with your
					Google account,
					<p className="bg-gradient-to-r from-slate-500 to-slate-400 bg-clip-text text-transparent inline">
						{" "}
						Quick Copy get access your email address, profile photo and use these to inform you which account
						currently on use and get permissions to delete, create and read own files from your Google Drive
						account.{" "}
					</p>
					After you logged in with your Google account for the first time, it is automatically backups your
					current items to your Google Drive account with permissions that you allowed. If you lose access to
					your Google Drive account or remove the app data, Quick Copy can not restore your items. In this
					case, all backup situation responsibilitys are on the user.
				</p>

				<h2 className="my-9 mt-24 text-center text-4xl font-bold"> End-to-end Encryption </h2>

				<p>
					At our mobile app, we take user privacy very seriously. We understand that the data you enter into
					our app, including clipboard data, is sensitive and private. To protect your data, we offer our
					users to end-to-end encryption.
					<br />
					<br />
					End-to-end encryption is a security feature that ensures that only you and the intended recipients
					of your data can access it. This means that your data is encrypted on transit and stays encrypted
					until it reaches its destination. No one, not even us, can read or access your data while it is in
					transit.
					<br />
					<br />
					Our app also backs up your data to Google Drive. We use this backup feature to help you restore your
					data in case you lose your device or accidentally delete your data. However, we understand that some
					users may be concerned about the privacy of their backed-up data.
					<br />
					<br />
					We want to assure you that your backed-up data is also encrypted with end-to-end encryption. This
					means that your data is protected even when it is stored on Google Drive. Additionally, we do not
					share your data with any third-party companies or individuals. Your data is yours, and we respect
					your right to privacy.
					<br />
					<br />
					In conclusion, we take your privacy seriously and use end-to-end encryption to protect your data
					both in transit and at rest. We do not share your data with third-party companies and only collect
					usage data to improve our app. If you have any questions or concerns about our privacy policy,
					please do not hesitate to contact us with
					<Link
						href={`mailto:${SUPPORT_MAIL}`}
						target="_blank"
						className="inline-link"
					>
						{" "}
						{SUPPORT_MAIL}
					</Link>
				</p>

				<p className="mt-9">
					If you do not want to give permissions, Quick Copy allows the users the export all of your items as
					XLSX, DOCX, TXT and JSON file. With that you can store your items yourself.
				</p>

				<p className="text-center mt-9">
					For more informations please check the
					<Link
						href="/quickcopy/privacy"
						aria-label="#"
						className="inline-link"
					>
						{" "}
						Privacy Policy
					</Link>
				</p>

				<h2 className="my-9 mt-24 text-center text-4xl font-bold">Google OAuth2 Limited Use Disclosure</h2>
				<p className="mb-24">
					<b>Quick Copy does not request any restricted scopes</b>, but if it did, Quick Copy use of
					information received from Google APIs will adhere to the
					<Link
						href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes"
						target="_blank"
						className="inline-link"
					>
						{" "}
						Google API Services User Data Policy,{" "}
					</Link>
					including the Limited Use requirements.
				</p>
			</div>
		</div>
	)
}
