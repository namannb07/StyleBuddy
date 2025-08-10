// @/components/outfit-rater.tsx
'use client';

import { useEffect, useRef, useState, useActionState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { rateOutfitAction, type RateOutfitState } from '@/app/actions';
import { SubmitButton } from '@/components/submit-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Camera, ThumbsUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState: RateOutfitState = {
  status: 'initial',
};

export function OutfitRater() {
  const [state, formAction] = useActionState(rateOutfitAction, initialState);
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
  
  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Rating Complete!",
        description: "Your outfit has been rated by StyleBuddy.",
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
        <CardTitle className="font-headline text-2xl">Outfit Rater</CardTitle>
        <CardDescription className="font-body">
          Wondering if your outfit hits the mark? Upload a photo and let your StyleBuddy give you an honest opinion.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form action={formAction} ref={formRef} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="outfitImage">Upload Your Outfit Photo</Label>
            <Input id="outfitImage" name="outfitImage" type="file" accept="image/*" required onChange={handleImageChange} />
            {state.errors?.outfitImage && (
              <p className="text-sm text-destructive">{state.errors.outfitImage[0]}</p>
            )}
          </div>

          {imagePreview && (
            <div className="relative w-full max-w-sm mx-auto aspect-square rounded-lg overflow-hidden border-2 border-dashed border-primary/50">
              <Image src={imagePreview} alt="Outfit preview" layout="fill" objectFit="cover" />
            </div>
          )}

          <SubmitButton className="w-full" pendingText="Rating...">Rate My Outfit</SubmitButton>
        </form>

        {state.status === 'success' && state.result && (
          <Card className="bg-primary/5 animate-in fade-in-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-6 h-6 text-primary" />
                <CardTitle className="font-headline text-xl">Your Rating Is In!</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="font-body text-muted-foreground">Overall Score</Label>
                <div className="flex items-center gap-4 mt-1">
                  <Progress value={state.result.rating * 10} className="w-full h-3" />
                  <span className="font-bold text-xl text-primary">{state.result.rating.toFixed(1)}/10</span>
                </div>
              </div>
              <div>
                <Label className="font-body text-muted-foreground">Friendly Feedback</Label>
                <p className="font-body mt-1">{state.result.feedback}</p>
              </div>
            </CardContent>
          </Card>
        )}
        
        {state.status === 'initial' && (
             <Alert className="border-primary/20 bg-primary/5 text-foreground">
                <Camera className="h-4 w-4" />
                <AlertTitle className="font-headline">Ready when you are!</AlertTitle>
                <AlertDescription className="font-body">
                    Upload a clear, full-body photo of your outfit for the best results.
                </AlertDescription>
            </Alert>
        )}
      </CardContent>
    </Card>
  );
}
