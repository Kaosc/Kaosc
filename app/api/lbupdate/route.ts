import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
	const authHeader = request.headers.get("authorization")
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new Response("Unauthorized Action", {
			status: 401,
		})
	}

	const getCurrentDate = () => {
		const now = new Date()
		const year = now.getUTCFullYear()
		const month = String(now.getUTCMonth() + 1).padStart(2, "0")
		const day = String(now.getUTCDate()).padStart(2, "0")
		return `${year}-${month}-${day}`
	}

	const getCurrentTime = () => {
		const now = new Date()
		const hours = String(now.getHours()).padStart(2, "0")
		const minutes = String(now.getMinutes()).padStart(2, "0")
		const seconds = String(now.getSeconds()).padStart(2, "0")
		return `${hours}:${minutes}:${seconds}`
	}

	const currentDate = getCurrentDate()
	const currentTime = getCurrentTime()

	const baseUrl = `${process.env.FIREBASE_DB_BASE}?auth=${process.env.FIREBASE_TOKEN}`
	const payload = {
		leaderboard_date: currentDate,
		learderboard_time: currentTime,
	}

	try {
		await fetch(baseUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		})
	} catch (error) {
		return NextResponse.json({ error })
	}

	return NextResponse.json(payload)
}
