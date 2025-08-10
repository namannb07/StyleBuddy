// @/app/actions.ts
'use server';

import { rateOutfit, type RateOutfitOutput } from '@/ai/flows/rate-outfit';
import { suggestOutfit, type SuggestOutfitOutput } from '@/ai/flows/suggest-outfit';
import { suggestOutfitFromPhoto } from '@/ai/flows/suggest-outfit-from-photo';
import { suggestHairstyle, type SuggestHairstyleOutput } from '@/ai/flows/suggest-hairstyle';
import { z } from 'zod';

// Utility to convert file to data URI
async function fileToDataUri(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${file.type};base64,${buffer.toString('base64')}`;
}

// Outfit Rater Action
const rateOutfitSchema = z.object({
  outfitImage: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'An image is required.')
    .refine((file) => file.type.startsWith('image/'), 'Only image files are allowed.'),
});

export type RateOutfitState = {
  status: 'initial' | 'pending' | 'success' | 'error';
  message?: string;
  result?: RateOutfitOutput;
  errors?: { outfitImage?: string[] };
};

export async function rateOutfitAction(
  prevState: RateOutfitState,
  formData: FormData
): Promise<RateOutfitState> {
  "use server"
  const validatedFields = rateOutfitSchema.safeParse({
    outfitImage: formData.get('outfitImage'),
  });

  if (!validatedFields.success) {
    return {
      status: 'error',
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const photoDataUri = await fileToDataUri(validatedFields.data.outfitImage);
    const result = await rateOutfit({ photoDataUri });
    return {
      status: 'success',
      message: 'Outfit rated successfully!',
      result,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}

// Style Guide Action
const suggestOutfitSchema = z.object({
  skinTone: z.string().min(1, 'Skin tone is required.'),
  faceShape: z.string().min(1, 'Face shape is required.'),
  bodyShape: z.string().min(1, 'Body shape is required.'),
});

const suggestOutfitFromPhotoSchema = z.object({
  styleImage: z
    .any()
    .refine((file) => file instanceof File && file.size > 0, 'An image is required.')
    .refine((file) => file instanceof File && file.type.startsWith('image/'), 'Only image files are allowed.'),
});

export type SuggestOutfitState = {
  status: 'initial' | 'pending' | 'success' | 'error';
  message?: string;
  result?: SuggestOutfitOutput;
  errors?: {
    skinTone?: string[];
    faceShape?: string[];
    bodyShape?: string[];
    styleImage?: string[];
    submissionType?: string[];
  };
};

export async function suggestOutfitAction(
  prevState: SuggestOutfitState,
  formData: FormData
): Promise<SuggestOutfitState> {
  "use server"

  const submissionType = formData.get('submissionType');

  if (submissionType === 'manual') {
    const validatedFields = suggestOutfitSchema.safeParse({
      skinTone: formData.get('skinTone'),
      faceShape: formData.get('faceShape'),
      bodyShape: formData.get('bodyShape'),
    });

    if (!validatedFields.success) {
      return {
        status: 'error',
        message: 'Invalid form data.',
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    try {
      const result = await suggestOutfit(validatedFields.data);
      return {
        status: 'success',
        message: 'Style guide generated!',
        result,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 'error',
        message: 'An unexpected error occurred. Please try again.',
      };
    }
  } else if (submissionType === 'photo') {
      const validatedFields = suggestOutfitFromPhotoSchema.safeParse({
        styleImage: formData.get('styleImage'),
      });
      
      if (!validatedFields.success) {
        return {
          status: 'error',
          message: 'Invalid form data.',
          errors: validatedFields.error.flatten().fieldErrors,
        };
      }

      try {
        const photoDataUri = await fileToDataUri(validatedFields.data.styleImage);
        const result = await suggestOutfitFromPhoto({ photoDataUri });
        return {
          status: 'success',
          message: 'Style guide generated!',
          result,
        };
      } catch (error) {
        console.error(error);
        return {
          status: 'error',
          message: 'An unexpected error occurred. Please try again.',
        };
      }
  }
  
  return {
      status: 'error',
      message: 'Invalid submission type.',
      errors: { submissionType: ['Please select a valid submission type.'] }
  };
}


// Hairstyle Helper Action
const suggestHairstyleSchema = z.object({
  faceImage: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'An image is required.')
    .refine((file) => file.type.startsWith('image/'), 'Only image files are allowed.'),
  gender: z.enum(['male', 'female'], {
    required_error: 'Please select a gender.',
  }),
});

export type SuggestHairstyleState = {
  status: 'initial' | 'pending' | 'success' | 'error';
  message?: string;
  result?: SuggestHairstyleOutput;
  errors?: {
    faceImage?: string[];
    gender?: string[];
  };
};

export async function suggestHairstyleAction(
  prevState: SuggestHairstyleState,
  formData: FormData
): Promise<SuggestHairstyleState> {
  "use server"
  const validatedFields = suggestHairstyleSchema.safeParse({
    faceImage: formData.get('faceImage'),
    gender: formData.get('gender'),
  });
  
  if (!validatedFields.success) {
    return {
      status: 'error',
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const photoDataUri = await fileToDataUri(validatedFields.data.faceImage);
    const result = await suggestHairstyle({
      photoDataUri,
      gender: validatedFields.data.gender,
    });
    return {
      status: 'success',
      message: 'Hairstyles suggested!',
      result,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
