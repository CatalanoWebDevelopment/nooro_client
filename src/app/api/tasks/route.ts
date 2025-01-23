import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function GET() {
  const res = await fetch(`${API_URL}/tasks`);
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}
