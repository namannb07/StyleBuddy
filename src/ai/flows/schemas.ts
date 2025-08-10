// @/ai/flows/schemas.ts
import { z } from 'zod';

export const SuggestOutfitOutputSchema = z.object({
  colorPalette: z
    .array(z.string().regex(/^#[0-9a-fA-F]{6}$/))
    .describe('An array of hex color codes for the suggested color palette.'),
  outfitSuggestion: z
    .object({
      top: z.string().describe('Suggestion for the top wear.'),
      bottom: z.string().describe('Suggestion for the bottom wear.'),
      wearables: z
        .string()
        .describe('Suggestions for accessories like sunglasses, watches, etc.'),
    })
    .describe('Outfit suggestions categorized by top, bottom, and wearables.'),
});
