import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
// app/api/wo/route.js
export async function GET(request) {
  // filters query
  const url = new URL(request.url);

  const query = url.searchParams.get("rf");
  // Set CORS headers
  const api = process.env.BASE_URL || "Default value if not set";
  const headers = new Headers();

  // check authentication
  const token = await getToken({ req: request });

  if (!token) {
    return new NextResponse(
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

  const wo_json = {
    action: "select",
    entity_id: 36,
    filters: { 2134: query },
  };

  try {
    const response = await fetch(api, {
      method: "POST",
      body: JSON.stringify(wo_json),
    });
    const wo_data = await response.json();

    // get required document data
    const req_json = {
      action: "select",
      entity_id: 127,
      filters: { 2259: wo_data.data[0]?.["id"] },
    };
    const req_document = await fetch(api, {
      method: "POST",
      body: JSON.stringify(req_json),
    });

    const parent_bgColor = [
      { id: 0, name: "Open", bg_color: "#00C49A" },
      { id: 1, name: "Waiting", bg_color: "#FFEB3B" },
      { id: 2, name: "Submitted", bg_color: "#007BFF" },
      { id: 3, name: "Request for Change", bg_color: "#FFEB3B" },
    ];

    const req_document_data = await req_document.json();

    // req document child
    const req_document_child_json = {
      action: "select",
      entity_id: 128,
      filters: { parent_item_id: req_document_data.data[0]?.["id"] },
    };
    const req_document_child = await fetch(api, {
      method: "POST",
      body: JSON.stringify(req_document_child_json),
    });
    const req_document_child_data = await req_document_child.json();
    return NextResponse.json({
      data: req_document_child_data.data,
      parent: {
        name: req_document_data.data[0]?.[2260] ?? 0,
        // sampe sini
        bg_color: parent_bgColor.filter(
          (i) => i.name == req_document_data.data[0]?.[2260] ?? 0
        ),
      },
      parent_id: req_document_data.data[0]?.id,
    });
  } catch (e) {
    console.error(e);
  }
}
