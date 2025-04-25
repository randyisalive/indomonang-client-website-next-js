import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// app/api/customer_account/route.js
export async function GET(request) {
  // get session data
  const session = await getToken({ req: request });

  if (session?.user?.role !== "Admin") {
    return NextResponse.json(
      { message: "Unauthorized Access" },
      { status: 200 }
    );
  }

  const api = process.env.BASE_URL || "Default value if not set";
  const json_data = {
    key: process.env.API_KEY,
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    action: "select",
    entity_id: 36,
  };

  try {
    const response = await fetch(api, {
      method: "POST",
      body: JSON.stringify(json_data),
    });
    const data = await response.json();
    // Return both the env variable and your JSON data
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
  }
}

export async function POST(request) {
  // get session data
  const { status } = await request.json();

  const api = process.env.BASE_URL || "Default value if not set";
  const json_data = {
    key: process.env.API_KEY,
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    action: "select",
    entity_id: 36,
    ...(status !== null ? { filters: { 311: status } } : {}),
  };

  try {
    const response = await fetch(api, {
      method: "POST",
      body: JSON.stringify(json_data),
    });
    const data = await response.json();
    // Return both the env variable and your JSON data
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
  }
}
