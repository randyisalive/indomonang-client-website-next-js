import { getToken } from "next-auth/jwt";

// app/api/wo/route.js
export async function GET(request) {
  // filters query
  const { searchParams } = new URL(request.url);
  const token = await getToken({ req: request });

  const query = searchParams.get("ref_num");
  // Set CORS headers
  const api = process.env.BASE_URL || "Default value if not set";
  const headers = new Headers();

  // check authentication

  if (!token) {
    return new Response(
      JSON.stringify({
        msg: "Need Authentication",
        status: "error",
      }),
      {
        headers,
        status: 200,
      }
    );
  }

  if (!query) {
    return new Response(
      JSON.stringify({
        msg: "Query not avaliable",
        status: "error",
      }),
      {
        headers,
        status: 200,
      }
    );
  }

  const json_data = {
    action: "select",
    entity_id: 127,
    ...(query !== null ? { filters: { 2258: query } } : {}),
  };
  try {
    const response = await fetch(api, {
      method: "POST",
      body: JSON.stringify(json_data),
    });
    const data = await response.json();
    if (data) {
      const child_json_data = {
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
