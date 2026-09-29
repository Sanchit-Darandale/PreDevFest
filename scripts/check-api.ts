import { analyzeCode } from "../lib/gemini";
import { AI, SAMPLE } from "../config/app.config";

async function main() {
  console.log(`[check:api] Testing Gemini connection using model: ${AI.model}`);
  console.log(`[check:api] Sending sample ${SAMPLE.language} code...`);

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("\n=================== ROAST OUTPUT ===================");
    console.log(`Roast:\n${result.roast}`);
    console.log(`\nIssues Detected: ${result.issues.length}`);
    result.issues.forEach((issue, idx) => {
      console.log(`  [#${idx + 1}] Line ${issue.line} [${issue.severity}]: ${issue.title}`);
      console.log(`       Diagnosis: ${issue.diagnosis}`);
    });
    console.log(`\nCorrected Code:\n${result.correctedCode}`);
    console.log(`\nTakeaway: ${result.takeaway}`);
    console.log("====================================================\n");
    console.log("✅ API verification succeeded!");
  } catch (error) {
    console.error("\n❌ API verification failed:");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
