import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: "AIzaSyADP8N8VZGJ1-F9-r0LF9GAVEpNoliLf4U", // Replace with your actual API key
    }),
  ],
  model: "googleai/gemini-2.0-flash",
});
