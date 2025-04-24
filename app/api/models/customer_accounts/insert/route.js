import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// app/api/customer_account/route.js
export async function POST(request) {
  // Set CORS headers
  const { username, password, email, company, role } = await request.json();
  const hashed_password = await bcrypt.hash(password, 10);

  const api = process.env.BASE_URL || "Default value if not set";
  const json_data = {
    key: process.env.API_KEY,
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    action: "insert",
    entity_id: 154,
    items: {
      field_2614: username,
      field_2615: hashed_password,
      field_2616: email,
      field_2630: company,
      field_2628: role,
    },
  };
  try {
    const response = await fetch(api, {
      method: "POST",
      body: JSON.stringify(json_data),
    });
    const data = await response.json();
    if (data.status === "success") {
      // get code verification
      const code_json_data = {
        key: process.env.API_KEY,
        username: process.env.API_USERNAME,
        password: process.env.API_PASSWORD,
        action: "select",
        entity_id: 154,
        select_fields: "2619",
        filters: { 2616: email },
      };
      const response_code = await fetch(api, {
        method: "POST",
        body: JSON.stringify(code_json_data),
      });
      const code_data = await response_code.json();
      if (code_data) {
        return NextResponse.json({
          code_verification: code_data.data[0][2619],
          data: data.data,
          status: "success",
        });
      }
    }
    // Return both the env variable and your JSON data
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(data);
  }
}
