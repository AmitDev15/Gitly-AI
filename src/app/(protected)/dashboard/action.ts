"use server";
import { streamText } from "ai";
import { createStreamableValue } from "@ai-sdk/rsc";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateEmbedding } from "~/lib/gemini";
import { db } from "~/server/db";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function askQuestion(question: string, projectId: string) {
  const stream = createStreamableValue();

  // console.log("Generating embedding for question:", question);
  const queryVector = await generateEmbedding(question);
  // console.log("Query vector length:", queryVector.length);

  const vectorQuery = `[${queryVector.join(",")}]`;

  // console.log("Querying database for projectId:", projectId);

  // First, check if there are any embeddings for this project
  const count = await db.sourceCodeEmbedding.count({
    where: { projectId },
  });
  // console.log(`Found ${count} embeddings for project`);

  // Try with a lower similarity threshold and without NULL check
  const result = (await db.$queryRaw`
      SELECT "fileName", "sourceCode", "summary",
             1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS similarity
      FROM "SourceCodeEmbedding"
      WHERE "projectId" = ${projectId}
        AND "summaryEmbedding" IS NOT NULL
        AND 1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) > 0.3
      ORDER BY similarity DESC
      LIMIT 10
    `) as {
    fileName: string;
    sourceCode: string;
    summary: string;
  }[];

  // const result = (await db.$queryRaw`
  //     SELECT "fileName", "sourceCode", "summary",
  //            1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS similarity
  //     FROM "SourceCodeEmbedding"
  //     WHERE "projectId" = ${projectId}
  //       AND "summaryEmbedding" IS NOT NULL
  //     ORDER BY similarity DESC
  //     LIMIT 10
  //   `) as {
  //   fileName: string;
  //   sourceCode: string;
  //   summary: string;
  // }[];

  // console.log(
  //   "========================Received file Result:=======================>\n",
  //   result,
  // );

  let context = "";
  for (const doc of result) {
    context += `Source File Name: ${doc.fileName}\n Summary of File: ${doc.summary}\n Code Content:\n${doc.sourceCode}\n\n`;
  }

  // console.log(
  //   "======================Context for question:=======================\n",
  //   context,
  // );

  (async () => {
    const { textStream } = await streamText({
      model: google("gemini-2.5-flash"),
      prompt: `
      You are a senior ai code assistant who answers questions about the codebase. Your target audience is a technical intern who is looking to understand the codebase. Be technical, concise, and accurate.

      AI assistant is a brand new, powerful, human-like artificial intelligence. The traits of AI include export knowledge, helpfulness, cleverness, and articulateness.

      AI is a well-behaved and well-mannered individual. AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.

      AI has the sum of all knowledge in their brain, and is able to accurately and efficiently answer nearly any question about any topic in conversation.

      If the question is asking about code or a specific file, AI will provide the detailed answer, giving step by step instructions, including code snippets where appropriate.

      START CONTEXT BLOCK
      ${context}
      END OF CONTEXT BLOCK

      START QUESTION
      ${question}
      END OF QUESTION

      AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation, please answer the question asked above in a clear and concise manner.

      Please provide a detailed and thoughtful answer to the question above, based on the provided context. If the context does not contain the information needed to answer the question, please say "I'm sorry, I don't have enough information to answer that question."

      AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
      AI assistant will not invent anything that is not drawn directly from the context.
      Answer in markdown syntax, with code snippets if needed. Be as detailed as possible when answering, and provide step by step instructions if the question is about code, make sure there is no ambiguity in your answer.
      `,
    });
    for await (const delta of textStream) {
      stream.update(delta);
    }
    stream.done();
  })();
  return {
    output: stream.value,
    filesReferences: result,
  };
}
