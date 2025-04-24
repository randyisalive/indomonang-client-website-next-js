import { NextResponse } from "next/server";

export async function POST(request) {
  // POST request
  const { email } = await request.json();
  console.log(email);
  const api = process.env.BASE_URL || "Default value if not set";
  const json_data = {
    key: process.env.API_KEY,
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    action: "select",
    entity_id: 154,
    select_fields: "2616",
    filters: { 2616: email },
  };
  try {
    const response = await fetch(api, {
      method: "POST",
      body: JSON.stringify(json_data),
    });
    const data = await response.json();
    console.log(data);

    // Return both the env variable and your JSON data
    return NextResponse.json({
      data: data.data,
      status: "success",
    });
  } catch (e) {
    console.error(e);
  }
}
