// app/api/customer_account/route.js
export async function GET(request) {
  // Set CORS headers
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
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
    });
    const data = await response.json();
    // Return both the env variable and your JSON data
    return Response.json({
      data: data.data,
      status: "success",
    });
  } catch (e) {
    console.error(e);
  }
}
