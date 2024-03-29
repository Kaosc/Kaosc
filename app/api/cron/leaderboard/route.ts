import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { SUPPORT_MAIL } from "@/utils/constants"

type Leaderboard = {
	info: LeaderboardInfo
	userlist: LeaderboardUser[]
	promocodes: string[]
	totalUsers: number
	winners: {
		[date: string]: Winners
	}
} | null

type LeaderboardInfo = {
	leaderboard_date: string
	learderboard_time: string
	alert: {
		text: {
			tr: ""
			en: ""
		}
		align: "center" | "left"
		fontSize: number
	}
	shutdown: boolean
	reward: {
		active: boolean
		tr: string
		en: string
	}
	introduction: boolean
	notification: boolean
}

type LeaderboardUser = {
	id: string
	leaderboard_date: string
	score: number
	username: string
	email: string
	lang: string
	promoCode?: string
}

type Winners = LeaderboardUser[] | "NO_WINNERS_FOUND"

export async function GET(request: NextRequest) {
	if (process.env.NODE_ENV !== "development") {
		const authHeader = request.headers.get("authorization")
		if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
			return new Response("Unauthorized Action", {
				status: 401,
			})
		}
	}

	const MINIMUM_SCORE_TO_WIN = 100
	const baseRef = process.env.NODE_ENV === "development" ? "leaderboard-debug" : "leaderboard"
	const dataBaseUrl = `${process.env.FIREBASE_DB_BASE}/${baseRef}.json?auth=${process.env.FIREBASE_TOKEN}&?print=pretty`

	let leaderboardData: Leaderboard = null

	try {
		leaderboardData = await fetch(dataBaseUrl, { cache: "no-store" }).then(
			async (response) => await response?.json()
		)
	} catch (e) {
		return NextResponse.json(`Error on retrieving the leaderboard data: ${e}`)
	}

	if (!leaderboardData) {
		return NextResponse.json(`Couldn't retrieve leaderboard data ${leaderboardData}`)
	}

	const userList = leaderboardData?.userlist ? Object.values(leaderboardData?.userlist) : []
	let newWinners: Winners = []
	let assignedPromoCodes: string[] = []

	if (userList.length > 0) {
		newWinners = userList
			.filter((user) => user !== null && user.score >= MINIMUM_SCORE_TO_WIN)
			.sort((a, b) => b.score - a.score)
			.slice(0, 3)

		if (Array.isArray(newWinners) && newWinners?.length > 0) {
			// Assign promo codes
			for (let i = 0; i < newWinners.length; i++) {
				const promoCode = leaderboardData?.promocodes[i]

				if (promoCode) {
					newWinners[i].promoCode = promoCode
					assignedPromoCodes.push(promoCode)
				} else {
					newWinners[i].promoCode = "NO_CODE_LEFT"
				}
			}
		} else {
			newWinners = "NO_WINNERS_FOUND"
		}
	}

	// Send mails
	if (Array.isArray(newWinners) && newWinners.length > 0) {
		newWinners = await Promise.all(
			newWinners.map(async (winner) => {
				const { username, email, promoCode, lang } = winner
				const mailSent = await sendEmail(username, email, promoCode, lang)
				return {
					...winner,
					mailSent: mailSent,
				}
			})
		)
	}

	const payload: Leaderboard = {
		info: {
			...leaderboardData.info,
			leaderboard_date: getCurrentDate(),
			learderboard_time: getCurrentTime(),
		},
		userlist: [],
		totalUsers: 0,
		promocodes: leaderboardData?.promocodes.filter((code) => !assignedPromoCodes.includes(code)),
		winners: {
			...leaderboardData.winners,
			[leaderboardData?.info?.leaderboard_date]: newWinners,
		},
	}

	try {
		await fetch(dataBaseUrl, {
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

async function sendEmail(
	username: string,
	email: string,
	promoCode: string | undefined,
	lang: string | undefined
): Promise<boolean> {
	if (!promoCode) return false

	const tempId = lang === "en" ? "d-ec7a5e33f2da494f8062699fc96ab72e" : "d-a778f53b7e6b4f57a7f63b4a690fd2ee"

	const requestBody = {
		from: {
			email: SUPPORT_MAIL,
		},
		personalizations: [
			{
				to: [
					{
						email: email,
					},
				],
				dynamic_template_data: {
					promoCode: promoCode,
					username: username,
				},
			},
		],
		template_id: tempId,
	}

	return await fetch("https://api.sendgrid.com/v3/mail/send", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(requestBody),
	})
		.then(async (response) => {
			if (response.ok) {
				return true
			} else {
				return false
			}
		})
		.catch((e) => {
			console.warn(e)
			return false
		})
}

const getCurrentDate = () => {
	const now = new Date()
	const options = { timeZone: "Europe/Istanbul" }
	const year = now.toLocaleString("en-US", { ...options, year: "numeric" })
	const month = now.toLocaleString("en-US", { ...options, month: "2-digit" })
	const day = now.toLocaleString("en-US", { ...options, day: "2-digit" })
	return `${year}-${month}-${day}`
}

const getCurrentTime = () => {
	const now = new Date()
	const options = { timeZone: "Europe/Istanbul" }
	const hours = String(now.toLocaleString("en-US", { ...options, hour: "2-digit", hour12: false })).padStart(
		2,
		"0"
	)
	const minutes = String(now.toLocaleString("en-US", { ...options, minute: "2-digit" })).padStart(2, "0")
	const seconds = String(now.toLocaleString("en-US", { ...options, second: "2-digit" })).padStart(2, "0")
	return `${hours}:${minutes}:${seconds}`
}
