import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import sale from "./sale.json"

export async function GET(request: NextRequest) {
	if (process.env.NODE_ENV !== "development") {
		const authHeader = request.headers.get("authorization")
		if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
			return new Response("Unauthorized Action", {
				status: 401,
			})
		}
	}

	return NextResponse.json(sale)
}
