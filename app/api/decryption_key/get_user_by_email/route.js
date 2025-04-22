// app/api/decryption_key/get_user_by_email/route.js
export async function POST(request) {
  // token
  const token = process.env.ENCRYPTION_KEY;
  // Set CORS headers
  const headers = new Headers();
  const header_token = headers.get("Authorization");
  const body = await request.json();
  const email = body.email;

  if (!email && token != header_token.startsWith("Bearer ")) {
    return Response.json(
      {
        status: "error",
        message: "Email parameter is required",
      },
      { status: 400 }
    );
  }
  const api = process.env.BASE_URL || "Default value if not set";
  const json_data = {
    action: "select",
    entity_id: 154,
    filters: { 2616: email },
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
    return Response.json(
      {
        status: "error",
        message: e.message || "An error occurred",
      },
      { status: 500 }
    );
  }
}
