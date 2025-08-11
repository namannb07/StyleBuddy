import { suggestHairstyleFlow } from '@/ai/flows/suggest-hairstyle';
import { appRoute } from '@genkit-ai/next';

export const POST = appRoute(suggestHairstyleFlow);
