import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_AI_API_KEY, // Use env variable
    }),
  ],
  model: "googleai/gemini-2.5-flash",
});
