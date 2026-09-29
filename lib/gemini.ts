import { GoogleGenAI, ApiError } from "@google/genai";
import { AI } from "@/config/app.config";
import { RoastRequest, RoastResult } from "@/types/roast";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";

function friendlyErrorMessage(status: number | undefined, error: unknown): string {
  const errMsg = error instanceof Error ? error.message : String(error);

  switch (status) {
    case 400:
      return `Invalid request to Gemini API (400). Please check input formatting: ${errMsg}`;
    case 403:
      return "Invalid or unauthorized GEMINI_API_KEY (403). Please verify your API key in .env.local from Google AI Studio.";
    case 404:
      return `Gemini model "${AI.model}" was not found (404). Check AI.model in config/app.config.ts.`;
    case 429:
      return "Bhai, itni bhi jaldi kya hai? Rate limit reached (429). Thoda ruk, 30 seconds wait kar bhau!";
    case 503:
      return "Gemini server is temporarily overloaded (503). Compiler ki chai thandi ho rahi hai, retry shortly.";
    default:
      return `Gemini API error (${status ?? "unknown"}): ${errMsg}`;
  }
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  let lastError: unknown;

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents: buildUserPrompt(request),
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText || responseText.trim() === "") {
        throw new Error("Received empty response from Gemini model.");
      }

      let parsed: Partial<RoastResult>;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        throw new Error("Failed to parse Gemini response as valid JSON.");
      }

      return {
        roast: parsed.roast ?? "",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode: parsed.correctedCode ?? "",
        takeaway: parsed.takeaway ?? "",
      };
    } catch (err: unknown) {
      lastError = err;
      const status =
        err instanceof ApiError
          ? err.status
          : (err as { status?: number })?.status;

      if (status === 503 && attempt < AI.maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }

      throw new Error(friendlyErrorMessage(status, err));
    }
  }

  throw new Error(
    friendlyErrorMessage(503, lastError ?? "Max retry attempts reached")
  );
}
