/**
 * @fileOverview Outfit suggestion flow based on user's photo.
 *
 * - suggestOutfitFromPhotoFlow - A flow that handles the outfit suggestion process from a photo.
 * - SuggestOutfitFromPhotoInput - The input type for the suggestOutfitFromPhoto function.
 * - SuggestOutfitOutput - The return type for the suggestOutfitFromPhoto function.
 */

import {ai} from '@/ai/genkit';
import {SuggestOutfitOutputSchema} from './schemas';
import {z} from 'genkit';

export type SuggestOutfitOutput = z.infer<typeof SuggestOutfitOutputSchema>;

const SuggestOutfitFromPhotoInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of a person, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
});
export type SuggestOutfitFromPhotoInput = z.infer<typeof SuggestOutfitFromPhotoInputSchema>;

const prompt = ai.definePrompt({
  name: 'suggestOutfitFromPhotoPrompt',
  input: {schema: SuggestOutfitFromPhotoInputSchema},
  output: {schema: SuggestOutfitOutputSchema},
  prompt: `You are a personal stylist. Analyze the provided photo to determine the person's skin tone, face shape, and body shape. Then, suggest an outfit and color combinations that would suit them.

Photo: {{media url=photoDataUri}}

Provide a color palette with 5 hex codes.
Also, provide outfit suggestions broken down into top, bottom, and wearables (e.g., sunglasses, watch).
`,
});

export const suggestOutfitFromPhotoFlow = ai.defineFlow(
  {
    name: 'suggestOutfitFromPhotoFlow',
    inputSchema: SuggestOutfitFromPhotoInputSchema,
    outputSchema: SuggestOutfitOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
