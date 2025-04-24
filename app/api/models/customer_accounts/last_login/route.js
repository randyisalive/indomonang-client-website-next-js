import { NextResponse } from "next/server";

// app/api/customer_account/route.js
export async function POST(request) {
  // request form
  const { id } = await request.json();
  // Set CORS headers

  const api = process.env.BASE_URL || "Default value if not set";
  const json_data = {
    key: process.env.API_KEY,
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    action: "select",
    entity_id: 161,
    filters: { parent_item_id: id },
  };
  try {
    const response = await fetch(api, {
      method: "POST",
      body: JSON.stringify(json_data),
    });
    const data = await response.json();
    console.log(data);
    // Return both the env variable and your JSON data
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
  }
}
