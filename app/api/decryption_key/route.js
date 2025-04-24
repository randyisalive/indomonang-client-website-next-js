// app/api/decryption_key/route.js
export async function GET(request) {
  // Set CORS headers
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  // Handle OPTIONS request (preflight)
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers,
      status: 204,
    });
  }

  const api = process.env.BASE_URL || "Default value if not set";
  const json_data = {
    key: process.env.API_KEY,
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    action: "select",
    entity_id: 156,
    select_fields: "2644",
  };

  try {
    const response = await fetch(api, {
      method: "POST",
      body: JSON.stringify(json_data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({
        data: data.data,
        status: "success",
      }),
      {
        headers,
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        status: "error",
        message: e.message,
      }),
      {
        headers,
        status: 500,
      }
    );
  }
}
