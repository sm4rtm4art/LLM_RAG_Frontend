// TODO: FASTAPI INTEGRATION
// This should be replaced with a call to your FastAPI health check endpoint
// The frontend should directly call your FastAPI health endpoint instead of this Next.js API route

import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ status: "ok" })
}
