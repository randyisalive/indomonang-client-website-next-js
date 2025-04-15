import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// app/api/wo/route.js
export async function GET(request) {
  // filters query
  const { searchParams } = new URL(request.url);
  const token = await getToken({ req: request });

  const query = searchParams.get("q");
  // Set CORS headers
  const api = process.env.BASE_URL || "Default value if not set";
  const headers = new Headers();

  // check authentication

  if (!token) {
    return new Response(
      JSON.stringify({
        msg: "Need Authentication",
        status: "error",
      }),
      {
        headers,
        status: 200,
      }
    );
  }

  const json_data = {
    action: "select",
    entity_id: 36,
    ...(query !== null ? { filters: { 311: query } } : {}),
  };
  try {
    const response = await fetch(api, {
      method: "POST",
      body: JSON.stringify(json_data),
    });
    const data = await response.json();
    return new Response(
      JSON.stringify({
        data: data.data,
        status: "success",
      }),
      {
        headers,
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
  }
}
