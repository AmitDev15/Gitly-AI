import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Document } from "@langchain/core/documents";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // or "gemini-2.5-pro"
});

export const aiSummarizeCommit = async (diff: string) => {
  try {
    const prompt = `
You are an expert programmer, and you are trying to summarize a git diff.

Reminders about the git diff format:
For every file, there are a few metadata lines, like (for example):
\`\`\`
diff --git a/lib.index.js b/lib/index.js
index aadf691..bfef603 100644
--- a/lib/index.js
+++ b/lib/index.js
\`\`\`
This means that \`lib/index.js\` was modified in this commit.
A line starting with \`+\` means that this line was added.
A line starting with \`-\` means that this line was removed.
A line that starts with neither \`+\` nor \`-\` is context for understanding and is not part of the diff.

EXAMPLE SUMMARY COMMENTS:
\`\`\`
* Raised the amount of returned recordings from \`10\` to \`100\` [packages/server/recordings_api.ts], [packages/server/constants.ts]
* Fixed a typo in the GitHub action name [.github/workflows/gpt-commit-summarizer.yml]
* Moved the \`octokit\` initialization to a separate file [src/octokit.ts], [src/index.ts]
* Added an OpenAI API for completions [packages/utils/apis/openai.ts]
* Lowered numeric tolerance for test files
\`\`\`

Please summarize the following diff file:
${diff}
`;
    console.log("Calling Gemini API...");
    const response = await model.generateContent(prompt);
    const summary = response.response.text();
    console.log("Gemini API response:", summary);
    return summary;
  } catch (error) {
    console.error("Error in aiSummarizeCommit:", error);
    throw error;
  }
};

export async function summarizeCode(doc: Document) {
  try {
    const code = doc.pageContent.slice(0, 10000); // Limit to first 10,000 characters
    // const prompt = `You are an intelligent senior software engineer who specializes in onboarding junior software engineers onto projects. You are onboarding a junior software engineer and explaining to them the purpose of the ${doc.metadata.source} file.
    // Here is the code:
    // ---
    // ${code}
    // ---
    // Please provide a concise summary no more than 100 words of the code above and its key functionalities.`;
    const prompt = `
    You are a senior software engineer helping onboard a new developer to this project.

    Project context:
    - Repository type: ${doc.metadata.projectType || "General JavaScript/TypeScript application"}
    - Tech stack: ${doc.metadata.techStack || "Unknown (likely Node.js, React, or related frameworks)"}
    - This file: ${doc.metadata.source || "Unknown file"}

    Your role:
    Explain this file as if you were documenting it for a new developer joining the team.

    Your goals:
    1. Summarize the **purpose** of this file and its role in the project.
    2. Describe **main functions, classes, or exports** and what they do.
    3. Explain **how this file interacts with other parts** of the system (if inferable).
    4. Focus on intent and behavior — not on repeating the code.
    5. Keep your explanation **under 120 words**.
    6. Use a confident, technical tone suitable for internal engineering documentation.
    7. If the code appears incomplete or only boilerplate, note that briefly.

    Here is the code (trimmed to 10,000 characters for efficiency):
    ---
    ${code}
    ---
    Now produce a clear, technical summary below:
    `;

    const response = await model.generateContent(prompt);
    // return response.response.text();
    const summary =
      response.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      response.response.text() ||
      "No summary generated.";

    return summary.trim();
  } catch (error) {
    return "Error: Unable to summarize the provided code.";
  }
}

export async function generateEmbedding(summary: string) {
  const model = genAI.getGenerativeModel({
    model: "text-embedding-004",
  });
  const result = await model.embedContent(summary);
  const embedding = result.embedding;
  return embedding.values;
}
