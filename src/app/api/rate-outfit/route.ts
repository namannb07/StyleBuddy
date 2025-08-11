import { rateOutfitFlow } from '@/ai/flows/rate-outfit';
import { appRoute } from '@genkit-ai/next';

export const POST = appRoute(rateOutfitFlow);
