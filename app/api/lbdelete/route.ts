import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
	const authHeader = request.headers.get("authorization")
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new Response("Unauthorized Action", {
			status: 401,
		})
	}

	const baseUrl = `${process.env.FIREBASE_DB_BASE}/leaderboard.json?auth=${process.env.FIREBASE_TOKEN}`

	try {
		await fetch(baseUrl, {
			method: "DELETE",
		})
	} catch (error) {
		return NextResponse.json({ error })
	}

	return NextResponse.json(">>> LEADERBOARD DELETED")
}
