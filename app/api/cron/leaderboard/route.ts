import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

type Referances = "userlist" | "info" | "winners"

type Leaderboard = {
	info: LeaderboardInfo
	userlist: LeaderboardUser[]
	winners: LeaderboardUser[]
}

type LeaderboardInfo = {
	leaderboard_date: string
	learderboard_time: string
	alert: {
		text: string
		align: "center" | "left"
	}
	shutdown: boolean
	reward: {
		active: boolean
		tr: string
		en: string
	}
}

type LeaderboardUser = {
	id: string
	leaderboard_date: string
	score: number
	username: string
	email: string
	promocode?: string
}

export async function GET(request: NextRequest) {
	if (process.env.NODE_ENV !== "development") {
		const authHeader = request.headers.get("authorization")
		if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
			return new Response("Unauthorized Action", {
				status: 401,
			})
		}
	}

	const dataBaseUrl = (ref?: Referances) => {
		const path = ref || ""
		return `${process.env.FIREBASE_DB_BASE}/leaderboard/${path}.json?auth=${process.env.FIREBASE_TOKEN}&?print=pretty`
	}

	// Fetch leaderboard data
	const leaderboardData: Leaderboard = await fetch(dataBaseUrl(), { cache: "no-store" })
		.then(async (response) => await response?.json())
		.catch((e) => NextResponse.json(`Error on retrieving the leaderboard data: ${e}`))

	if (!leaderboardData) return NextResponse.json("Couldn't retrieve leaderboard data", leaderboardData)

	// SET NEW WINNERS
	try {
		const newWinners = Object.values(leaderboardData.userlist)
			.sort((a, b) => b.score - a.score)
			.slice(0, 3)

		// Update winners with new winners data
		const payload = {
			...leaderboardData.winners,
			[leaderboardData?.info?.leaderboard_date]: newWinners,
		}

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

	// DELETE USERLIST
	try {
		await fetch(dataBaseUrl("userlist"), {
			method: "DELETE",
			cache: "no-store",
		})
	} catch (e) {
		return NextResponse.json(`Error on deleting user list: ${e}`)
	}

	// UPDATE LEADERBOARD INFO
	try {
		const payload: LeaderboardInfo = {
			...leaderboardData.info,
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
