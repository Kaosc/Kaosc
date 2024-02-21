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

	const winnersUrl = `${process.env.FIREBASE_DB_BASE}/leaderboard/winners.json?auth=${process.env.FIREBASE_TOKEN}&?print=pretty`

	const winners = await fetch(winnersUrl, {
		method: "GET",
		cache: "no-store",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(async (response) => {
			const data = await response.json()

			return data
		})
		.catch((e) => NextResponse.json(`xxx Couldn't retrieve winners data: ${e}`))

	// Convert winners keys to array
	if (!winners) {
		return NextResponse.json(`>>> No winners data found: ${winners}`)
	}

	const dateArray = Object.keys(winners)

	if (dateArray.length === 1) {
		return NextResponse.json(">>> No need to cleanup winners data")
	}

	// Convert date strings to Date objects for comparison
	const dateObjects = dateArray.map((dateString) => new Date(dateString))

	// Find the latest date
	const latestDate = new Date(
		Math.max.apply(
			null,
			dateObjects.map((date) => date.getTime())
		)
	)

	// Convert the latest date back to a string
	const latestDateStr = latestDate.toISOString().split("T")[0]

	// Keep only the most recent date in the "winners" object
	let newData = {
		[latestDateStr]: winners[latestDateStr],
	}

	return await fetch(winnersUrl, {
		method: "PUT",
		cache: "no-store",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newData),
	})
		.then(async (res) => {
			if (res.ok) {
				return NextResponse.json(">>> Cleaned up winners data")
			}
		})
		.catch((e) => NextResponse.json(`xxx Couldn't set the recent winners data ${e}`))
}
