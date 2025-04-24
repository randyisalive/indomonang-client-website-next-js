import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// app/api/wo/route.js
export async function POST(request) {
  // post params
  const { email } = await request.json();
  const secret = process.env.NEXTAUTH_SECRET;
  const token = jwt.sign({ email }, secret, { expiresIn: "1m" }); // 1 mins expiration time for token

  // Set CORS headers
  const api = process.env.BASE_URL || "Default value if not set";

  // get user by email
  const user_json = {
    key: process.env.API_KEY,
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    action: "select",
    entity_id: 154,
    filters: { 2616: email },
  };
  try {
    const user_response = await fetch(api, {
      method: "POST",
      body: JSON.stringify(user_json),
    });
    const user_data = await user_response.json();
    const user_id = user_data.data[0].id;

    // check authentication

    const json_data = {
      key: process.env.API_KEY,
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD,
      action: "update",
      entity_id: 154,
      data: {
        field_3437: token,
        field_2634: user_data.data[0][2634] === "No" ? "true" : "false",
      },
      update_by_field: { id: user_id },
    };
    try {
      const response = await fetch(api, {
        method: "POST",
        body: JSON.stringify(json_data),
      });
      const link = `${process.env.NEXT_PUBLIC_API_URL}/reset_password/validate_link?token=${token}`;
      return NextResponse.json({ link, expiresIn: "10 minutes", status: true });
    } catch (e) {
      return NextResponse.json({ status: false });
    }
  } catch (e) {
    return NextResponse.json({
      status: false,
      msg: "Account not found for that email!",
    });
  }
}
