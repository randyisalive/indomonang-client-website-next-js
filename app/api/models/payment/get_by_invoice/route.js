import { getToken } from "next-auth/jwt";
import { getSession, useSession } from "next-auth/react";
import { NextResponse } from "next/server";

// app/api/models/payment/route.js
export async function GET(request) {
  // get seession data
  const { user } = await getToken({ req: request });
  console.log(user);
  if (user?.role !== "Admin") {
    return NextResponse.json(
      { message: "Unauthorized Access, user is not Admin" },
      { status: 200 }
    );
  }

  const api = process.env.BASE_URL || "Default value if not set";
  const json_data = {
    key: process.env.API_KEY,
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    action: "select",
    entity_id: 110,
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
