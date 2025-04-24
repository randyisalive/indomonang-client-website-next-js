import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

// app/api/wo/route.js
export async function POST(request) {
  // Set CORS headers
  const api = process.env.BASE_URL || "Default value if not set";

  // Body
  const { password } = await request.json();

  // params
  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  // get user by email
  const user_json = {
    key: process.env.API_KEY,
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    action: "select",
    entity_id: 154,
    filters: { 3437: key },
  };
  try {
    const user_response = await fetch(api, {
      method: "POST",
      body: JSON.stringify(user_json),
    });
    const user_data = await user_response.json();
    const user_id = user_data.data[0].id;

    // update password
    const hashedPassword = await bcrypt.hash(password, 10);
    const update_password_json = {
      key: process.env.API_KEY,
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD,
      action: "update",
      entity_id: 154,
      data: {
        field_2615: hashedPassword,
      },
      update_by_field: { id: user_id },
    };

    try {
      const response = await fetch(api, {
        method: "POST",
        body: JSON.stringify(update_password_json),
      });
      return NextResponse.json({ message: "Password updated!", status: true });
    } catch (e) {
      return NextResponse.json({ message: "Error!", status: false });
    }
  } catch (e) {
    return NextResponse.json({
      status: false,
      msg: "Error!!",
    });
  }
}

export async function GET(request) {
  return NextResponse.json({}, { status: 200 });
}
