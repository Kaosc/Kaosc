export async function GET() {
	const getCurrentDate = () => {
		const now = new Date()
		const year = now.getUTCFullYear()
		const month = String(now.getUTCMonth() + 1).padStart(2, "0")
		const day = String(now.getUTCDate()).padStart(2, "0")
		return `${year}-${month}-${day}`
	}

	const currentDate = getCurrentDate()
	const baseUrl = `${process.env.FIREBASE_LEADERBOARD_INFO_URL}?auth=${process.env.FIREBASE_TOKEN}`

	const payload = {
		id: 0,
		leaderboard_date: currentDate,
	}

	try {
		await fetch(baseUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		})
		return Response.json({ stauts: "200" })
	} catch (error) {
		console.error("Error in fetch:", error)
		return Response.json({ stauts: "400", error: error })
	}
}
