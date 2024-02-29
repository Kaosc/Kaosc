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

	const status = process.env.NODE_ENV === "development" ? "false" : request.headers.get("Boost-Status")

	if (status === null) return NextResponse.json("No boost status specified")

	const baseRef = process.env.NODE_ENV === "development" ? "leaderboard-debug" : "leaderboard"
	const url = `${process.env.FIREBASE_DB_BASE}/${baseRef}/info/boost.json?auth=${process.env.FIREBASE_TOKEN}`

	try {
		await fetch(url, {
			method: "PUT",
			cache: "no-store",
			headers: {
				"Content-Type": "application/json",
			},
			body: status,
		})
	} catch (e) {
		return NextResponse.json(`Error on setting boost: ${e}`)
	}

	return NextResponse.json(`>>> Leaderboard boost status: ${status}`)
}
