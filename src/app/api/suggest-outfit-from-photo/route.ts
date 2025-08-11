import { suggestOutfitFromPhotoFlow } from '@/ai/flows/suggest-outfit-from-photo';
import { appRoute } from '@genkit-ai/next';

export const POST = appRoute(suggestOutfitFromPhotoFlow);
