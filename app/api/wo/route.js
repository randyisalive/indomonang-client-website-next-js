// app/api/wo/route.js
export async function GET(request) {
  // Set CORS headers
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  const api = process.env.BASE_URL || "Default value if not set";

  const json_data = {
    action: "select",
    entity_id: 36,
  };
  try {
    const response = await fetch(api, {
      method: "POST",
      body: JSON.stringify(json_data),
    });
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
  }
}
