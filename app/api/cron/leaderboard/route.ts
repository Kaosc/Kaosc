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

	const dataBaseUrl = (ref: "userlist" | "info" | "winners") => {
		const baseurl = `${process.env.FIREBASE_DB_BASE}/leaderboard/${ref}.json?auth=${process.env.FIREBASE_TOKEN}&?print=pretty`
		return baseurl
	}

	// await createFakeLeaderBoard(dataBaseUrl("userlist"))
	// return NextResponse.json(`>>> Fake leaderboard created`)

	// SAVE WINNERS
	try {
		// Fetch existing leaderboard data
		const lbWinners = await fetch(dataBaseUrl("winners"), { cache: "no-store" })
		const currentWinners = await lbWinners.json()

		// Fetch new winners of the week
		const lbUserlist = await fetch(dataBaseUrl("userlist"), { cache: "no-store" })
		const newWinners =
			Object.fromEntries(Object.entries(await lbUserlist.json()).slice(0, 3)) || "NO_WINNER_FOUND"

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
	const year = now.getFullYear()
	const month = String(now.getMonth() + 1).padStart(2, "0")
	const day = String(now.getDate()).padStart(2, "0")
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
		body: JSON.stringify({
			"1": {
				id: "1",
				leaderboard_date: 0,
				score: 456,
				username: "Alpha",
			},
			"2": {
				id: "2",
				leaderboard_date: 0,
				score: 789,
				username: "Beta",
			},
			"3": {
				id: "3",
				leaderboard_date: 0,
				score: 654,
				username: "Gamma",
			},
			"4": {
				id: "4",
				leaderboard_date: 0,
				score: 323,
				username: "Mercer",
			},
			"5": {
				id: "5",
				leaderboard_date: 0,
				score: 123,
				username: "Vortex",
			},
			"6": {
				id: "6",
				leaderboard_date: 0,
				score: 234,
				username: "Luna",
			},
			"7": {
				id: "7",
				leaderboard_date: 0,
				score: 2352,
				username: "Blaze",
			},
			"8": {
				id: "8",
				leaderboard_date: 0,
				score: 2342,
				username: "Phoenix",
			},
			"9": {
				id: "9",
				leaderboard_date: 0,
				score: 0,
				username: "Rogue",
			},
			"10": {
				id: "10",
				leaderboard_date: 0,
				score: 0,
				username: "Specter",
			},
			"11": {
				id: "11",
				leaderboard_date: 0,
				score: 0,
				username: "Titan",
			},
			"12": {
				id: "12",
				leaderboard_date: 0,
				score: 0,
				username: "Fury",
			},
			"13": {
				id: "13",
				leaderboard_date: 0,
				score: 565,
				username: "Astra",
			},
			"14": {
				id: "14",
				leaderboard_date: 0,
				score: 0,
				username: "Nova",
			},
			"15": {
				id: "15",
				leaderboard_date: 0,
				score: 0,
				username: "Orion",
			},
			"16": {
				id: "16",
				leaderboard_date: 0,
				score: 0,
				username: "Nebula",
			},
			"17": {
				id: "17",
				leaderboard_date: 0,
				score: 0,
				username: "Galaxy",
			},
			"18": {
				id: "18",
				leaderboard_date: 0,
				score: 0,
				username: "Cosmo",
			},
			"19": {
				id: "19",
				leaderboard_date: 0,
				score: 0,
				username: "Zephyr",
			},
			"20": {
				id: "20",
				leaderboard_date: 0,
				score: 0,
				username: "Quasar",
			},
		}),
	})
}
