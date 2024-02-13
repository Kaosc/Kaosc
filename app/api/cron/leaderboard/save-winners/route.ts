import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Get winners of the week before the clean up and save those into leaderboardWinners
 */
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

	const leaderboardWinnersUrl = `${process.env.FIREBASE_DB_BASE}/leaderboardWinners.json?auth=${process.env.FIREBASE_TOKEN}`
	const leaderboardUrl = `${process.env.FIREBASE_DB_BASE}/leaderboard.json?auth=${process.env.FIREBASE_TOKEN}&?print=pretty`

	let winners: string[] = []
	const currentDate = getCurrentDate()

	try {
		const response = await fetch(leaderboardUrl)
		winners = await response.json()
	} catch (e) {
		console.error(e)
		return NextResponse.json(`Error on retrieving the leaderboard winners: ${e}`)
	}

	const payload = {
		[currentDate]: winners,
	}

	try {
		await fetch(leaderboardWinnersUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		})
	} catch (error) {
		return NextResponse.json({ error })
	}

	return NextResponse.json(`>>> Winners of the ${currentDate} are saved`)
}
