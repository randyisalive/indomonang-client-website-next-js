import { NextResponse } from "next/server";

// app/api/customer_account/route.js
export async function POST(request) {
  // request form
  const { company_id } = await request.json();
  // Set CORS headers

  const api = process.env.BASE_URL || "Default value if not set";
  const json_data = {
    key: process.env.API_KEY,
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    action: "select",
    entity_id: 36,
    filters: { 314: company_id },
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
