import { NextResponse } from "next/server";

export async function POST(request) {
  // POST request
  const { code, display_code, email } = await request.json();
  console.log(code);
  const api = process.env.BASE_URL || "Default value if not set";
  const json_data = {
    key: process.env.API_KEY,
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    action: "update",
    entity_id: 154,
    data: {
      field_2618: 1,
    },
    update_by_field: {
      field_2616: email,
    },
  };
  try {
    if (code === display_code) {
      const response = await fetch(api, {
        method: "POST",
        body: JSON.stringify(json_data),
      });
      const data = await response.json();
      console.log(data);

      // Return both the env variable and your JSON data
      return NextResponse.json(data);
    } else {
      return NextResponse.json({
        data: "Code not same",
        status: "error",
      });
    }
  } catch (e) {
    console.error(e);
  }
}
