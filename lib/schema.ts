import { Schema, Type } from "@google/genai";
import { SEVERITIES } from "@/config/app.config";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "A funny, punchy Hinglish roast critique of the code.",
    },
    issues: {
      type: Type.ARRAY,
      description: "List of identified issues and bugs in order of severity.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number where the issue occurs.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "The severity of the issue.",
          },
          title: {
            type: Type.STRING,
            description: "Short catchy Hinglish title with emoji.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "Exact problematic code line from user submission.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Humorous and technically clear Hinglish explanation of what went wrong.",
          },
          expected: {
            type: Type.STRING,
            description: "Clear Hinglish explanation of what should be done instead.",
          },
        },
        required: [
          "line",
          "severity",
          "title",
          "codeSnippet",
          "diagnosis",
          "expected",
        ],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "Complete, corrected and working source code with no markdown fences.",
    },
    takeaway: {
      type: Type.STRING,
      description: "A short, memorable takeaway or motivational conclusion in Hinglish with emoji.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
