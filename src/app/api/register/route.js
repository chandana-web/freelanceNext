import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";

    // MULTIPART FORM-DATA
    if (contentType.includes("multipart/form-data")) {
      const incoming = await req.formData();
      const type = incoming.get("type");

      let targetUrl = null;

      if (type === "client")
        targetUrl = "https://freelancing-experts-gjbi.vercel.app/api/users/register";

      else if (type === "freelancer")
        targetUrl = "https://freelancing-experts.vercel.app/api/Freelancer/register";

      else if (type === "organisation")
        targetUrl = "https://freelancing-experts-tkv4.vercel.app/api/organisation/register";

      if (!targetUrl)
        return NextResponse.json({ success: false, message: "Invalid type" });

      // Rebuild FormData using native Node FormData (provided by Next.js)
      const fd = new FormData();

      for (const [key, value] of incoming.entries()) {
        if (value instanceof File) {
          fd.append(key, value, value.name);
        } else {
          fd.append(key, value);
        }
      }

      // SEND TO BACKEND
      const backendRes = await fetch(targetUrl, {
        method: "POST",
        body: fd
      });

      const text = await backendRes.text();

      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = { raw: text };
      }

      return NextResponse.json(parsed, { status: backendRes.status });
    }

    // JSON (fallback)
    const json = await req.json();
    return NextResponse.json(json);

  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Server Error", error: err.message },
      { status: 500 }
    );
  }
}
