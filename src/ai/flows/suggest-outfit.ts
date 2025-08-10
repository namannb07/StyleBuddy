'use server';

/**
 * @fileOverview Outfit suggestion flow based on user's skin tone, face shape, and body shape.
 *
 * - suggestOutfit - A function that handles the outfit suggestion process.
 * - SuggestOutfitInput - The input type for the suggestOutfit function.
 * - SuggestOutfitOutput - The return type for the suggestOutfit function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOutfitInputSchema = z.object({
  skinTone: z
    .string()
    .describe('The user provided skin tone (e.g., fair, medium, dark).'),
  faceShape: z.string().describe('The user provided face shape (e.g., round, oval, square).'),
  bodyShape: z.string().describe('The user provided body shape (e.g., apple, pear, rectangle).'),
});
export type SuggestOutfitInput = z.infer<typeof SuggestOutfitInputSchema>;

const SuggestOutfitOutputSchema = z.object({
  outfitSuggestion: z.string().describe('Outfit suggestions based on the provided characteristics.'),
  colorSuggestion: z.string().describe('Color suggestions based on the provided characteristics.'),
});
export type SuggestOutfitOutput = z.infer<typeof SuggestOutfitOutputSchema>;

export async function suggestOutfit(input: SuggestOutfitInput): Promise<SuggestOutfitOutput> {
  return suggestOutfitFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOutfitPrompt',
  input: {schema: SuggestOutfitInputSchema},
  output: {schema: SuggestOutfitOutputSchema},
  prompt: `You are a personal stylist. Suggest an outfit and color combinations based on the user's skin tone, face shape, and body shape.

Skin Tone: {{{skinTone}}}
Face Shape: {{{faceShape}}}
Body Shape: {{{bodyShape}}}

Output your response by suggesting an outfit and a color combination for this person.
`,
});

const suggestOutfitFlow = ai.defineFlow(
  {
    name: 'suggestOutfitFlow',
    inputSchema: SuggestOutfitInputSchema,
    outputSchema: SuggestOutfitOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
