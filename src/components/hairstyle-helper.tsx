// @/components/hairstyle-helper.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { SubmitButton } from '@/components/submit-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Scissors, Sparkles, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { runFlow } from '@genkit-ai/next/client';
import { suggestHairstyleFlow } from '@/ai/flows/suggest-hairstyle';
import type { SuggestHairstyleOutput } from '@/ai/flows/suggest-hairstyle';

type SuggestHairstyleState = {
  status: 'initial' | 'loading' | 'success' | 'error';
  result?: SuggestHairstyleOutput;
  message?: string;
  errors?: {
    [key: string]: string[];
  };
};

const initialState: SuggestHairstyleState = {
  status: 'initial',
};

export function HairstyleHelper() {
  const [state, setState] = useState<SuggestHairstyleState>(initialState);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ status: 'loading' });
    const formData = new FormData(event.currentTarget);
    const file = formData.get('faceImage') as File;
    const gender = formData.get('gender') as 'male' | 'female';

    const reader = new FileReader();
    reader.onloadend = async () => {
      const photoDataUri = reader.result as string;
      try {
        const result = await runFlow<typeof suggestHairstyleFlow>({
          url: '/api/suggest-hairstyle',
          input: { photoDataUri, gender },
        });
        setState({ status: 'success', result });
      } catch (error) {
        setState({ status: 'error', message: (error as Error).message });
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Hairstyles Found!",
        description: "Check out your personalized hairstyle suggestions.",
      });
      formRef.current?.reset();
      setImagePreview(null);
    } else if (state.status === 'error' && state.message) {
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong.",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Hairstyle Helper</CardTitle>
        <CardDescription className="font-body">
          Find the perfect hairstyle for you. Upload a clear picture of your face to get started.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4 items-start">
              <div className="space-y-2">
                <Label htmlFor="faceImage">Upload Your Face Photo</Label>
                <Input id="faceImage" name="faceImage" type="file" accept="image/*" required onChange={handleImageChange} />
                {state.errors?.faceImage && (
                  <p className="text-sm text-destructive">{state.errors.faceImage[0]}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup name="gender" required className="flex items-center gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="font-normal">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="font-normal">Male</Label>
                  </div>
                </RadioGroup>
                 {state.errors?.gender && (
                  <p className="text-sm text-destructive">{state.errors.gender[0]}</p>
                )}
              </div>
          </div>

          {imagePreview && (
            <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-dashed border-primary/50">
              <Image src={imagePreview} alt="Face preview" layout="fill" objectFit="cover" />
            </div>
          )}

          <SubmitButton className="w-full" pendingText="Analyzing...">Suggest Hairstyles</SubmitButton>
        </form>

        {state.status === 'success' && state.result && (
          <Card className="bg-primary/5 animate-in fade-in-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <CardTitle className="font-headline text-xl">Your Hairstyle Suggestions</CardTitle>
              </div>
              <CardDescription className="font-body !mt-2">Based on your <span className="font-bold text-primary">{state.result.faceShape.toLowerCase()}</span> face shape, here are some styles you might love:</CardDescription>
            </CardHeader>
            <CardContent>
              <Carousel className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto">
                <CarouselContent>
                  {state.result.suggestedHairstyles.map((style, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex flex-col items-center justify-center p-2 gap-2">
                            <div className="relative w-full aspect-square rounded-md overflow-hidden">
                               <Image src={state.result.referencePhotos?.[index] || `https://placehold.co/400x400.png`} data-ai-hint="hairstyle portrait" alt={style} layout="fill" objectFit="cover" />
                            </div>
                            <span className="text-sm text-center font-semibold font-headline">{style}</span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>
        )}
        
        {state.status === 'initial' && (
             <Alert className="border-primary/20 bg-primary/5 text-foreground">
                <User className="h-4 w-4" />
                <AlertTitle className="font-headline">Find Your New Look!</AlertTitle>
                <AlertDescription className="font-body">
                    Upload a clear, front-facing photo and select your gender to discover hairstyles that complement your face shape.
                </AlertDescription>
            </Alert>
        )}
      </CardContent>
    </Card>
  );
}
