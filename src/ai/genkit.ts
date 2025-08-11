import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: "AIzaSyDh7a_imMsu45pf23X_jVxKGf2vjk2apL4", // Replace with your actual API key
    }),
  ],
  model: "googleai/gemini-2.0-flash",
});
