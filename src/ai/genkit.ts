import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: "AIzaSyBvq9KF-Lo9U8ck-kCn6IJCx7L5lcFki18", // Replace with your actual API key
    }),
  ],
  model: "googleai/gemini-2.0-flash",
});
