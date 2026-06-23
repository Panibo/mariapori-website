import { track } from "@vercel/analytics/server";
import type { NextRequest } from "next/server";
import { isLocale, type Locale } from "@/src/config/site";

export const dynamic = "force-dynamic";

const cvDownloads = {
  en: {
    assetPath: "/data/Miro-Mariapori-CV-EN.pdf",
    filename: "Miro-Mariapori-CV-EN.pdf",
  },
  fi: {
    assetPath: "/data/Miro-Mariapori-CV-FI.pdf",
    filename: "Miro-Mariapori-CV-FI.pdf",
  },
} satisfies Record<Locale, { assetPath: string; filename: string }>;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return Response.json({ error: "CV not found" }, { status: 404 });
  }

  const download = cvDownloads[locale];

  console.info("cv_download", {
    locale,
    filename: download.filename,
  });

  try {
    await track(
      "cv_download",
      { locale, filename: download.filename },
      { request: { headers: request.headers } },
    );
  } catch (error) {
    console.error("Failed to track CV download", error);
  }

  const assetUrl = new URL(download.assetPath, request.url);
  const pdfResponse = await fetch(assetUrl);

  if (!pdfResponse.ok || !pdfResponse.body) {
    return Response.json({ error: "CV file not found" }, { status: 404 });
  }

  const headers = new Headers({
    "Cache-Control": "no-store, max-age=0",
    "Content-Disposition": `attachment; filename="${download.filename}"`,
    "Content-Type": "application/pdf",
  });
  const contentLength = pdfResponse.headers.get("content-length");

  if (contentLength) {
    headers.set("Content-Length", contentLength);
  }

  return new Response(pdfResponse.body, {
    headers,
  });
}
