import { NextResponse } from "next/server";

// app/api/customer_account/route.js
export async function POST(request) {
  // request form
  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ message: "id is undefined" }, { status: 400 });
  }
  // Set CORS headers
  const api = process.env.BASE_URL || "Default value if not set";
  const json_data = {
    key: process.env.API_KEY,
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    action: "download_attachment",
    entity_id: 154,
    item_id: id,
    field_id: 2637,
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
