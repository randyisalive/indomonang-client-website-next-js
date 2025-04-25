import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// app/api/customer_account/route.js
export async function POST(request) {
  // Extract request JSON
  const { invoice_id } = await request.json();

  if (!invoice_id) {
    return NextResponse.json({
      message: "Invalid input data 📁",
    });
  }

  const api = process.env.BASE_URL || "Default value if not set";
  const json_data = {
    key: process.env.API_KEY,
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    action: "download_attachment",
    entity_id: 108,
    item_id: invoice_id,
    field_id: "1968",
  };

  try {
    // Fetch Base64 content from API
    const response = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json_data),
    });

    const data = await response.json();

    // Check for success in API response
    if (data.status === "success") {
      const { content, filename } = data.data;

      // Decode Base64 content to buffer
      const buffer = Buffer.from(content, "base64");

      // Return the file as an attachment directly
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; ${filename}"`,
        },
      });
    } else {
      // Handle API failure
      return NextResponse.json({
        message: "Failed to download attachment",
        status: data.status || "unknown",
        error: data.message || "No additional information",
      });
    }
  } catch (error) {
    console.error("Error during API call or processing:", error);

    return NextResponse.json(
      { message: "Server error occurred", error: error.message },
      { status: 500 }
    );
  }
}
