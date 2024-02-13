import { NextResponse } from "next/server"

export async function PUT() {
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

	const baseUrl = `${process.env.FIREBASE_LEADERBOARD_INFO_URL}?auth=${process.env.FIREBASE_TOKEN}`
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
		return NextResponse.json(payload)
	} catch (error) {
		return NextResponse.json({ error })
	}
}
