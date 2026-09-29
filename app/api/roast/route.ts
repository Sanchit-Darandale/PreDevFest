import { NextRequest, NextResponse } from "next/server";
import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, RoastLevel, RoastRequest } from "@/types/roast";
import { analyzeCode } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const code = typeof body.code === "string" ? body.code : "";
  const errorMessage =
    typeof body.errorMessage === "string" ? body.errorMessage.trim() : "";

  // 1. Check for empty code
  if (code.trim().length === 0) {
    return NextResponse.json(
      { error: "No code provided." },
      { status: 400 }
    );
  }

  // 2. Code length limit
  if (code.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code exceeds maximum allowed length of ${LIMITS.maxCodeLength.toLocaleString()} characters (current: ${code.length.toLocaleString()}).`,
      },
      { status: 400 }
    );
  }

  // 3. Error message length limit
  if (errorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message exceeds maximum allowed length of ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // Fallback language & roastLevel if not valid
  const validLanguageIds = LANGUAGES.map((lang) => lang.id);
  const validRoastLevels = ROAST_LEVELS.map((level) => level.id);

  const language = validLanguageIds.includes(body.language as LanguageId)
    ? (body.language as LanguageId)
    : DEFAULTS.language;

  const roastLevel = validRoastLevels.includes(body.roastLevel as RoastLevel)
    ? (body.roastLevel as RoastLevel)
    : DEFAULTS.roastLevel;

  const roastRequest: RoastRequest = {
    code,
    language,
    roastLevel,
    errorMessage: errorMessage || undefined,
  };

  try {
    const result = await analyzeCode(roastRequest);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("[api/roast] Error analyzing code:", error);
    const message =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while analyzing the code.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
