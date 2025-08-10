// @/ai/flows/schemas.ts
import { z } from 'zod';

export const SuggestOutfitOutputSchema = z.object({
  outfitSuggestion: z.string().describe('Outfit suggestions based on the provided characteristics.'),
  colorSuggestion: z.string().describe('Color suggestions based on the provided characteristics.'),
});
