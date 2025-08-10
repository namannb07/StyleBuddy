// @/components/style-guide.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { suggestOutfitAction, type SuggestOutfitState } from '@/app/actions';
import { SubmitButton } from '@/components/submit-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Wand, Palette, Shirt } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState: SuggestOutfitState = {
  status: 'initial',
};

const skinTones = ['Fair', 'Light', 'Medium', 'Tan', 'Dark', 'Deep'];
const faceShapes = ['Oval', 'Round', 'Square', 'Heart', 'Diamond', 'Long'];
const bodyShapes = ['Apple', 'Pear', 'Rectangle', 'Hourglass', 'Inverted Triangle'];

export function StyleGuide() {
  const [state, formAction] = useFormState(suggestOutfitAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Style Guide Ready!",
        description: "Your personalized suggestions are here.",
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
        <CardTitle className="font-headline text-2xl">Personalized Style Guide</CardTitle>
        <CardDescription className="font-body">
          Tell us about yourself to receive personalized color palettes and outfit recommendations that highlight your best features.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form ref={formRef} action={formAction} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="skinTone">Skin Tone</Label>
              <Select name="skinTone" required>
                <SelectTrigger id="skinTone"><SelectValue placeholder="Select your skin tone" /></SelectTrigger>
                <SelectContent>{skinTones.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="faceShape">Face Shape</Label>
              <Select name="faceShape" required>
                <SelectTrigger id="faceShape"><SelectValue placeholder="Select your face shape" /></SelectTrigger>
                <SelectContent>{faceShapes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bodyShape">Body Shape</Label>
              <Select name="bodyShape" required>
                <SelectTrigger id="bodyShape"><SelectValue placeholder="Select your body shape" /></SelectTrigger>
                <SelectContent>{bodyShapes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <SubmitButton className="w-full" pendingText="Generating...">Get My Style Guide</SubmitButton>
        </form>

        {state.status === 'success' && state.result && (
          <div className="grid md:grid-cols-2 gap-4 animate-in fade-in-50">
            <Card className="bg-primary/5">
              <CardHeader>
                 <div className="flex items-center gap-2">
                    <Palette className="w-6 h-6 text-primary" />
                    <CardTitle className="font-headline text-xl">Color Suggestions</CardTitle>
                 </div>
              </CardHeader>
              <CardContent>
                <p className="font-body">{state.result.colorSuggestion}</p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5">
              <CardHeader>
                 <div className="flex items-center gap-2">
                    <Shirt className="w-6 h-6 text-primary" />
                    <CardTitle className="font-headline text-xl">Outfit Suggestions</CardTitle>
                 </div>
              </CardHeader>
              <CardContent>
                <p className="font-body">{state.result.outfitSuggestion}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {state.status === 'initial' && (
             <Alert className="border-primary/20 bg-primary/5 text-foreground">
                <Wand className="h-4 w-4" />
                <AlertTitle className="font-headline">Unlock Your Style Potential</AlertTitle>
                <AlertDescription className="font-body">
                    Fill out the form above, and our AI stylist will create a personalized guide just for you.
                </AlertDescription>
            </Alert>
        )}
      </CardContent>
    </Card>
  );
}
