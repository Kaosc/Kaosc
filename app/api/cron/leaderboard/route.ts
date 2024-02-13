import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
	if (process.env.NODE_ENV !== "development") {
		const authHeader = request.headers.get("authorization")
		if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
			return new Response("Unauthorized Action", {
				status: 401,
			})
		}
	}

	const LB_INFO_URL = `${process.env.FIREBASE_DB_BASE}/leaderboardInfo.json?auth=${process.env.FIREBASE_TOKEN}`
	const LB_WINNERS_URL = `${process.env.FIREBASE_DB_BASE}/leaderboardWinners.json?auth=${process.env.FIREBASE_TOKEN}`
	const LB_URL = `${process.env.FIREBASE_DB_BASE}/leaderboard.json?auth=${process.env.FIREBASE_TOKEN}&?print=pretty`

	// await createFakeLeaderBoard(LB_URL)
	// return

	// SAVE WINNERS
	try {
		// Fetch existing leaderboard data
		const existingData = await fetch(LB_WINNERS_URL, { cache: "no-store" })
		let currentWinners = await existingData.json()

		// Fetch new winners of the week
		const lb = await fetch(LB_URL)
		let newWinners = (await lb.json())?.slice(0, 3) || "NO_WINNER_FOUND"

		// Fetch leaderboard_date date
		const lbInfo = await fetch(LB_INFO_URL, { cache: "no-store" })
		const leaderboard_date = (await lbInfo.json()).leaderboard_date

		// Update existing data with new winners
		const payload = {
			...currentWinners,
			[leaderboard_date]: newWinners,
		}

		// Save the updated data
		try {
			await fetch(LB_WINNERS_URL, {
				method: "PUT",
				cache: "no-store",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			})
		} catch (e) {
			return NextResponse.json(`Error on saving winners: ${e}`)
		}
	} catch (e) {
		return NextResponse.json(`Error on retrieving the leaderboard winners: ${e}`)
	}

	// DELETE LEADERBOARD
	try {
		await fetch(LB_URL, {
			method: "DELETE",
		})
	} catch (e) {
		return NextResponse.json(`Error on retrieving the leaderboard winners: ${e}`)
	}

	// UPDATE LEADERBOARD INFO
	try {
		const payload = {
			leaderboard_date: getCurrentDate(),
			learderboard_time: getCurrentTime(),
		}

		await fetch(LB_INFO_URL, {
			method: "PUT",
			cache: "no-store",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		})
	} catch (e) {
		return NextResponse.json(`Error on updating leaderboard: ${e}`)
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

const createFakeLeaderBoard = async (url: string) => {
	try {
		await fetch(url, {
			method: "PUT",
			cache: "no-store",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify([
				{ id: "1", leaderboard_date: 0, username: "Kaosc" },
				{ id: "2", leaderboard_date: 0, username: "Hyle" },
				{ id: "3", leaderboard_date: 0, username: "Alex" },
				{ id: "4", leaderboard_date: 0, username: "Mercer" },
			]),
		})
		return NextResponse.json(`>>> Fake leaderboard created`)
	} catch (e) {
		return NextResponse.json(`>>> Error on creating fake leaderboard: ${e}`)
	}
}
