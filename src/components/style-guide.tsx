// @/components/style-guide.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useFormState } from 'react-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { suggestOutfitAction, suggestOutfitFromPhotoAction, type SuggestOutfitState } from '@/app/actions';
import { SubmitButton } from '@/components/submit-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Wand, Palette, Shirt, Upload, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const initialState: SuggestOutfitState = {
  status: 'initial',
};

const skinTones = ['Fair', 'Light', 'Medium', 'Tan', 'Dark', 'Deep'];
const faceShapes = ['Oval', 'Round', 'Square', 'Heart', 'Diamond', 'Long'];
const bodyShapes = ['Apple', 'Pear', 'Rectangle', 'Hourglass', 'Inverted Triangle'];

export function StyleGuide() {
  const [state, formAction] = useFormState(suggestOutfitAction, initialState);
  const [photoState, photoFormAction] = useFormState(suggestOutfitFromPhotoAction, initialState);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('manual');

  const formRef = useRef<HTMLFormElement>(null);
  const photoFormRef = useRef<HTMLFormElement>(null);

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

  const activeState = activeTab === 'photo' ? photoState : state;
  
  useEffect(() => {
    if (state.status === 'success' || photoState.status === 'success') {
      toast({
        title: "Style Guide Ready!",
        description: "Your personalized suggestions are here.",
      });
      formRef.current?.reset();
      photoFormRef.current?.reset();
      setImagePreview(null);
    } else if (state.status === 'error' && state.message) {
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong.",
        description: state.message,
      });
    } else if (photoState.status === 'error' && photoState.message) {
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong.",
        description: photoState.message,
      });
    }
  }, [state, photoState, toast]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Personalized Style Guide</CardTitle>
        <CardDescription className="font-body">
          Receive personalized color palettes and outfit recommendations that highlight your best features.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="manual" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-primary/10 p-1 h-auto rounded-lg">
             <TabsTrigger value="manual" className="py-2.5 text-sm md:text-base flex items-center gap-2 rounded-md">
                <Edit className="w-5 h-5" />
                <span>Manual Input</span>
            </TabsTrigger>
            <TabsTrigger value="photo" className="py-2.5 text-sm md:text-base flex items-center gap-2 rounded-md">
                <Upload className="w-5 h-5" />
                <span>Upload Photo</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="manual" className="mt-6">
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
          </TabsContent>
          <TabsContent value="photo" className="mt-6">
             <form ref={photoFormRef} action={photoFormAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="styleImage">Upload Your Photo</Label>
                <Input id="styleImage" name="styleImage" type="file" accept="image/*" required onChange={handleImageChange} />
                {photoState.errors?.styleImage && (
                  <p className="text-sm text-destructive">{photoState.errors.styleImage[0]}</p>
                )}
              </div>

              {imagePreview && (
                <div className="relative w-full max-w-sm mx-auto aspect-[3/4] rounded-lg overflow-hidden border-2 border-dashed border-primary/50">
                  <Image src={imagePreview} alt="Style preview" layout="fill" objectFit="cover" />
                </div>
              )}

              <SubmitButton className="w-full" pendingText="Analyzing...">Get My Style Guide</SubmitButton>
            </form>
          </TabsContent>
        </Tabs>

        {(activeState.status === 'success' && activeState.result) && (
          <div className="grid md:grid-cols-2 gap-4 animate-in fade-in-50 pt-4">
            <Card className="bg-primary/5">
              <CardHeader>
                 <div className="flex items-center gap-2">
                    <Palette className="w-6 h-6 text-primary" />
                    <CardTitle className="font-headline text-xl">Color Suggestions</CardTitle>
                 </div>
              </CardHeader>
              <CardContent>
                <p className="font-body">{activeState.result.colorSuggestion}</p>
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
                <p className="font-body">{activeState.result.outfitSuggestion}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeState.status === 'initial' && (
             <Alert className="border-primary/20 bg-primary/5 text-foreground mt-6">
                <Wand className="h-4 w-4" />
                <AlertTitle className="font-headline">Unlock Your Style Potential</AlertTitle>
                <AlertDescription className="font-body">
                    Choose your preferred method to get started, and our AI stylist will create a personalized guide just for you.
                </AlertDescription>
            </Alert>
        )}
      </CardContent>
    </Card>
  );
}
