import { suggestOutfitFlow } from '@/ai/flows/suggest-outfit';
import { appRoute } from '@genkit-ai/next';

export const POST = appRoute(suggestOutfitFlow);
