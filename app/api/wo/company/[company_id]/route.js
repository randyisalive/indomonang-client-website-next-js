import { headers } from "next/headers";

// app/api/wo/route.js
export async function GET(request, { params }) {
  const { company_id } = await params;
  // Set CORS headers
  const api = process.env.BASE_URL || "Default value if not set";

  // Input validation: Ensure `company_id` is valid
  if (!company_id || typeof company_id !== "int") {
    return new Response(
      JSON.stringify({ message: "Invalid company_id provided" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400, // Bad Request
      }
    );
  }

  const json_data = {
    action: "select",
    entity_id: 36,
    filters: { 314: company_id },
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
        headers: { "Content-Type": "application/json" },
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
