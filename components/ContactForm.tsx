"use client"

import { useState, useEffect } from "react"
import { MdDoneOutline } from "react-icons/md"
import { useRouter } from "next/navigation"
import ActivityIndicator from "@/components/ui/indicator/ActivityIndicator"

type Email = {
	sender: string
	subject: string
	message: string
}

export default function ContactForm() {
	const router = useRouter()

	const [email, setEmail] = useState({} as Email)
	const [formError, setFromError] = useState("")
	const [sent, setSent] = useState(null as boolean | null)
	const [sending, setSending] = useState(false)

	useEffect(() => {
		return () => {
			setSending(false)
			setSent(null)
			setFromError("")
			setEmail({} as Email)
		}
	}, [])

	const sendEmail = async (sender: string, subject: string, message: string) => {
		setSending(true)
		await fetch("/api/send", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				sender: sender,
				subject: subject,
				message: message,
			}),
		})
			.then((res) => {
				if (res.status === 200) {
					setSent(true)
				} else {
					setSent(false)
				}
			})
			.finally(() => {
				setSending(false)
			})
	}

	const validate = () => {
		if (process.env.NODE_ENV === "development") {
			sendEmail(email.sender, email.subject, email.message)
			return
		}

		// check email
		if (!email.sender || !email.sender.includes("@")) {
			setFromError("Invalid email")
			//  check message at least 10 characters
		} else if (!email.message || email?.message?.length < 10) {
			setFromError("Message must be at least 10 characters")
		} else {
			setFromError("")
			sendEmail(email.sender, email.subject, email.message)
		}
	}

	const endSession = () => {
		router.push("/")
	}

	const GoHomeButton = () => {
		return (
			<button
				className="w-2/5 m-auto mb-9 p-3 rounded-2xl border-0 bg-zinc-900"
				onClick={endSession}
			>
				Home
			</button>
		)
	}

	return (
		<div className="flex flex-col mx-auto my-0 w-3/5 max-lg:w-4/5 max-md:w-full">
			{/* SENDING VIEW */}
			{sending && (
				<div className="p-2 rounded-lg mb-5 border-2 border-blue-900 bg-[#0000ff23]">
					<p className=" text-[17px] text-blue-600 mb-3">Sending...</p>
					<ActivityIndicator />
				</div>
			)}

			{/* SENT FAILED VIEW */}
			{sent === false && (
				<>
					<div className="p-2 rounded-lg mb-5 border-2 border-red-900 bg-[#ff000033]">
						<p className=" text-[17px] text-red-600">Could not send email. Please try again later.</p>
					</div>
					<GoHomeButton />
				</>
			)}

			{/* SENT SUCCESS VIEW */}
			{sent === true && (
				<>
					<div className="flex-col align-middle p-2 rounded-2xl mb-5 border-2 border-green-900 bg-[#00ff0023]">
						<div className="flex items-center justify-center">
							<MdDoneOutline
								color="#03b903"
								size={30}
								className="mb-1"
							/>
						</div>
						<p className=" text-[15px] text-green-600">
							Email sent. <br /> Someone will reach you soon.
						</p>
					</div>
					<GoHomeButton />
				</>
			)}

			{/* FORM ERROR VIEW */}
			{formError && (
				<div className="p-2 rounded-lg mb-5 border-2 border-red-900 bg-[#ff000033]">
					<p className="text-2xl text-red-600">{formError}</p>
				</div>
			)}

			{/* FORM VIEW */}
			{sent === null && !sending && (
				<>
					<input
						type="text"
						placeholder="Your email"
						onChange={(e) => {
							setEmail({
								...email,
								sender: e.target.value,
							})
						}}
						className="mb-4 h-12 rounded-2xl p-2  text-[17px] hover:opacity-50 bg-zinc-900 duration-300"
						required
					/>
					<input
						type="text"
						placeholder="Subject"
						onChange={(e) => {
							setEmail({
								...email,
								subject: e.target.value,
							})
						}}
						className="mb-4 h-12 rounded-2xl p-2  text-[17px] hover:opacity-50 bg-zinc-900"
					/>
					<textarea
						className="rounded-2xl p-2  text-[17px] mb-9 min-h-[150px] hover:opacity-50 bg-zinc-900 duration-300"
						placeholder="Message"
						onChange={(e) => {
							setEmail({
								...email,
								message: e.target.value,
							})
						}}
					/>
					<button
						onClick={validate}
						className="w-1/3 m-auto mb-9 p-2 rounded-2xl hover:opacity-50 bg-zinc-900 duration-300"
					>
						Send
					</button>
				</>
			)}
		</div>
	)
}
