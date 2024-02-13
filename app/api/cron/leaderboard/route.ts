import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
	const authHeader = request.headers.get("authorization")

	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new Response("Unauthorized Action", {
			status: 401,
		})
	}

	const LB_INFO_URL = `${process.env.FIREBASE_DB_BASE}/leaderboardInfo.json?auth=${process.env.FIREBASE_TOKEN}`
	const LB_WINNERS_URL = `${process.env.FIREBASE_DB_BASE}/leaderboardWinners.json?auth=${process.env.FIREBASE_TOKEN}`
	const LB_URL = `${process.env.FIREBASE_DB_BASE}/leaderboard.json?auth=${process.env.FIREBASE_TOKEN}&?print=pretty`

	// SAVE WINNERS
	try {
		let winners: string[] = []

		// Fetch winners of the week
		const lb = await fetch(LB_URL)
		winners = (await lb.json()).slice(0, 3)

		// Fetch leaderboard_date date
		const lbInfo = await fetch(LB_INFO_URL)
		const leaderboard_date = (await lbInfo.json()).leaderboard_date

		const payload = {
			[leaderboard_date]: winners,
		}

		// Save winners of the week under leaderboardWinners
		try {
			await fetch(LB_WINNERS_URL, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			})
		} catch (e) {
			return NextResponse.json(`Error on saving winners: ${JSON.stringify(e)}`)
		}
	} catch (e) {
		return NextResponse.json(`Error on retrieving the leaderboard winners: ${JSON.stringify(e)}`)
	}

	// DELETE LEADERBOARD
	try {
		await fetch(LB_URL, {
			method: "DELETE",
		})
	} catch (e) {
		return NextResponse.json(`Error on retrieving the leaderboard winners: ${JSON.stringify(e)}`)
	}

	// UPDATE LEADERBOARD INFO
	try {
		const payload = {
			leaderboard_date: getCurrentDate(),
			learderboard_time: getCurrentTime(),
		}

		await fetch(LB_INFO_URL, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		})
	} catch (e) {
		return NextResponse.json(`Error on updating leaderboard: ${JSON.stringify(e)}`)
	}

	return NextResponse.json(`>>> New week started succesfully`)
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
