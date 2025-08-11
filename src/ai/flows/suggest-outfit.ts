/**
 * @fileOverview Outfit suggestion flow based on user's skin tone, face shape, and body shape.
 *
 * - suggestOutfitFlow - A flow that handles the outfit suggestion process.
 * - SuggestOutfitInput - The input type for the suggestOutfit function.
 * - SuggestOutfitOutput - The return type for the suggestOutfit function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { SuggestOutfitOutputSchema } from './schemas';


const SuggestOutfitInputSchema = z.object({
  skinTone: z
    .string()
    .describe('The user provided skin tone (e.g., fair, medium, dark).'),
  faceShape: z.string().describe('The user provided face shape (e.g., round, oval, square).'),
  bodyShape: z.string().describe('The user provided body shape (e.g., apple, pear, rectangle).'),
  gender: z.enum(['male', 'female']).describe('The user provided gender.'),
});
export type SuggestOutfitInput = z.infer<typeof SuggestOutfitInputSchema>;
export type SuggestOutfitOutput = z.infer<typeof SuggestOutfitOutputSchema>;

const prompt = ai.definePrompt({
  name: 'suggestOutfitPrompt',
  input: {schema: SuggestOutfitInputSchema},
  output: {schema: SuggestOutfitOutputSchema},
  prompt: `You are a personal stylist. Suggest an outfit and color combinations based on the user's skin tone, face shape, body shape, and gender.

Skin Tone: {{{skinTone}}}
Face Shape: {{{faceShape}}}
Body Shape: {{{bodyShape}}}
Gender: {{{gender}}}

Provide a color palette with 5 hex codes.
Also, provide outfit suggestions broken down into top, bottom, and wearables (e.g., sunglasses, watch).
`,
});

export const suggestOutfitFlow = ai.defineFlow(
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
