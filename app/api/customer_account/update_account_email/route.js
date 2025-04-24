import { getToken } from "next-auth/jwt";

// app/api/wo/route.js
export async function POST(request) {
  //
  // filters query

  const token = await getToken({ req: request });

  // Set CORS headers
  const api = process.env.BASE_URL || "Default value if not set";
  const headers = new Headers();

  const json_data = {
    key: process.env.API_KEY,
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    action: "update",
    entity_id: 154,
    data: {
      field_3437: token,
    },
    update_by_field: { id: id },
  };
  try {
    const response = await fetch(api, {
      method: "POST",
      body: JSON.stringify(json_data),
    });
    const data = await response.json();
    if (data) {
      const child_json_data = {
        key: process.env.API_KEY,
        username: process.env.API_USERNAME,
        password: process.env.API_PASSWORD,
        action: "select",
        entity_id: 128,
        filters: { id: data.data[0]?.id },
      };
      const response_2 = await fetch(api, {
        method: "POST",
        body: JSON.stringify(child_json_data),
      });
      const child_data = await response_2.json();
      return new Response(
        JSON.stringify({
          data: data.data,
          child_data: child_data.data,
          status: "success",
        }),
        {
          headers,
          status: 200,
        }
      );
    }
  } catch (e) {
    console.error(e);
  }
}
