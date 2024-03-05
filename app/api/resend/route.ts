import { NextResponse } from "next/server"

export async function POST(request: Request) {
	const { sender, subject, message } = await request.json()

	const emailData = {
		from: "Acme <onboarding@resend.dev>",
		to: [process.env.RECIEVER_EMAIL],
		subject: "WEBSITE CONTACT",
		html: `
		<div>
			<h4> SENDER: ${sender}</h4>
			<h4> SUBJECT: ${subject}</h4>
			</br></br>
			<p>${message}</p>
		</div>`,
	}

	return await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(emailData),
	})
		.then((response) => {
			if (!response.ok) {
				return NextResponse.json(`Email sent`)
			}
		})
		.then((data) => {
			return NextResponse.json(`Email sent: ${data}`)
		})
		.catch((e) => {
			return NextResponse.json(`HTTP error! Status: ${e}`)
		})
}
