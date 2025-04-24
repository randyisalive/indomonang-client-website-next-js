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
    entity_id: 154,
    filters: { id: id },
  };
  try {
    const response = await fetch(api, {
      method: "POST",
      body: JSON.stringify(json_data),
    });
    const data = await response.json();
    const profile_picture_json = {
      key: process.env.API_KEY,
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD,
      action: "download_attachment",
      entity_id: 154,
      item_id: id,
      field_id: 2637,
    };
    const profile_picture_response = await fetch(api, {
      method: "POST",
      body: JSON.stringify(profile_picture_json),
    });
    const profile_picture_data = await profile_picture_response.json();

    return NextResponse.json({
      data: data.data,
      profile_picture_data: profile_picture_data.data,
      status: data.status === profile_picture_data.status && data.status,
    });
  } catch (e) {
    console.error(e);
  }
}
