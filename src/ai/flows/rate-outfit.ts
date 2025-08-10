'use server';

/**
 * @fileOverview An outfit rating AI agent.
 *
 * - rateOutfit - A function that handles the outfit rating process.
 * - RateOutfitInput - The input type for the rateOutfit function.
 * - RateOutfitOutput - The return type for the rateOutfit function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RateOutfitInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of the outfit, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
});
export type RateOutfitInput = z.infer<typeof RateOutfitInputSchema>;

const RateOutfitOutputSchema = z.object({
  rating: z
    .number()
    .describe('The overall rating of the outfit, from 1 to 10.'),
  feedback: z.string().describe('Detailed feedback on the outfit.'),
});
export type RateOutfitOutput = z.infer<typeof RateOutfitOutputSchema>;

export async function rateOutfit(input: RateOutfitInput): Promise<RateOutfitOutput> {
  return rateOutfitFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rateOutfitPrompt',
  input: {schema: RateOutfitInputSchema},
  output: {schema: RateOutfitOutputSchema},
  prompt: `You are a professional fashion stylist. You will be provided with a photo of an outfit.

You will rate the outfit on a scale of 1 to 10, and provide detailed feedback on the outfit.

Here is the photo of the outfit:

{{media url=photoDataUri}}
`,
});

const rateOutfitFlow = ai.defineFlow(
  {
    name: 'rateOutfitFlow',
    inputSchema: RateOutfitInputSchema,
    outputSchema: RateOutfitOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
