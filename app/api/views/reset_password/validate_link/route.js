import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(request) {
  const secret = process.env.NEXTAUTH_SECRET || "your_secret_key";
  const token = request.nextUrl.searchParams.get("token");
  const validation_bool = request.nextUrl.searchParams.get("validation");

  if (validation_bool) {
    try {
      const decoded = jwt.verify(token, secret);
      console.log(decoded);
      if (decoded) {
        return NextResponse.json({ message: "validated", status: true });
      }
    } catch (e) {
      return NextResponse.json({ message: "Link Expired!", status: false });
    }
  }

  if (!token) {
    return NextResponse.json(
      { message: "Invalid or missing token" },
      { status: 400 }
    );
  }

  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    const { email } = decoded;
    if (email) {
      return NextResponse.json(
        { message: "Email sended!", status: true },
        { status: 200 }
      );
    }
    return NextResponse.json({ message: "Link is valid", user: decoded.email });
  } catch (error) {
    return NextResponse.json(
      { message: "Link expired or invalid", status: false },
      { status: 401 }
    );
  }
}
