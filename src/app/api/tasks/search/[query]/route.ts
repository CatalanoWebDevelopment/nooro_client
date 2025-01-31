import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function GET(
  _request: Request,
  { params }: { params: { query: string } }
) {
  const res = await fetch(`${API_URL}/tasks/search/${params.query}`);
  const data = await res.json();
  return NextResponse.json(data);
}
