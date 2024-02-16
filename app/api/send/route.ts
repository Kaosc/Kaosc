import { NextResponse } from "next/server"
import SendGrid from "@sendgrid/mail"

import { SUPPORT_MAIL } from "@/utils/constants"

export async function POST(request: Request) {
	const { sender, subject, message } = await request.json()

	SendGrid.setApiKey(process.env.SENDGRID_API_KEY as string)
	try {
		const data = await SendGrid.send({
			from: SUPPORT_MAIL,
			replyTo: SUPPORT_MAIL,
			to: process.env.RECIEVER_EMAIL,
			subject: "KAOSC WEB CONTACT",
			html: `
  		<div>
  			<h4> SENDER: ${sender}</h4>
  			<h4> SUBJECT: ${subject}</h4>
  			</br></br>
  			<p>${message}</p>
  		</div>`,
		})
		return NextResponse.json(data)
	} catch (error) {
		return NextResponse.json({ error })
	}
}
