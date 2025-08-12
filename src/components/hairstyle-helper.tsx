// @/components/hairstyle-helper.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

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
                <Input id="faceImage" name="faceImage" type="file" accept="image/*" required />
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

          <SubmitButton className="w-full" pendingText="Analyzing..." pending={state.status === 'loading'}>Suggest Hairstyles</SubmitButton>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {state.result.suggestedHairstyles.map((style, index) => (
                  <Card key={index} className="bg-secondary/40 p-4 flex flex-col items-center justify-center text-center">
                    <Scissors className="w-8 h-8 text-secondary-foreground mb-2" />
                    <p className="font-headline text-lg text-secondary-foreground">{style}</p>
                  </Card>
                ))}
              </div>
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
