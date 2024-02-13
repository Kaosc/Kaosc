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

	const dataBaseUrl = (path?: "userlist" | "info" | "winners") => {
		const ref = "/" + path || ""
		console.log(ref)
		const baseurl = `${process.env.FIREBASE_DB_BASE}/leaderboard${ref}.json?auth=${process.env.FIREBASE_TOKEN}&?print=pretty`
		return baseurl
	}

	await createFakeLeaderBoard(dataBaseUrl("userlist"))
	return NextResponse.json(`>>> Fake leaderboard created`)

	// SAVE WINNERS
	try {
		// Fetch existing leaderboard data
		const lbWinners = await fetch(dataBaseUrl("winners"), { cache: "no-store" })
		const currentWinners = await lbWinners.json()

		// Fetch new winners of the week
		const lb = await fetch(dataBaseUrl("userlist"))
		let newWinners = (await lb.json())?.slice(0, 3) || "NO_WINNER_FOUND"

		// Fetch leaderboard_date date
		const lbInfo = await fetch(dataBaseUrl("info"), { cache: "no-store" })
		const leaderboard_date = (await lbInfo.json()).leaderboard_date

		// Update existing data with new winners
		const payload = {
			...currentWinners,
			[leaderboard_date]: newWinners,
		}

		// Save the updated data
		try {
			await fetch(dataBaseUrl("winners"), {
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
		await fetch(dataBaseUrl("userlist"), {
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

		await fetch(dataBaseUrl("info"), {
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
	await fetch(url, {
		method: "PUT",
		cache: "no-store",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify([
			{
				id: "1",
				username: "Kaosc",
				leaderboard_date: 0,
				score: 0,
			},
			{
				id: "2",
				username: "Hyle",
				leaderboard_date: 0,
				score: 0,
			},
			{
				id: "3",
				username: "Alex",
				leaderboard_date: 0,
				score: 0,
			},
			{
				id: "4",
				username: "Mercer",
				leaderboard_date: 0,
				score: 0,
			},
		]),
	})
}
