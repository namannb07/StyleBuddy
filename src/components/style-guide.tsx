// @/components/style-guide.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SubmitButton } from '@/components/submit-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Wand, Palette, Shirt, Upload, Edit, Glasses, CaseUpper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { runFlow } from '@genkit-ai/next/client';
import { suggestOutfitFlow } from '@/ai/flows/suggest-outfit';
import { suggestOutfitFromPhotoFlow } from '@/ai/flows/suggest-outfit-from-photo';
import type { SuggestOutfitOutput } from '@/ai/flows/suggest-outfit';

type SuggestOutfitState = {
  status: 'initial' | 'loading' | 'success' | 'error';
  result?: SuggestOutfitOutput;
  message?: string;
  errors?: {
    [key: string]: string[];
  };
};

const initialState: SuggestOutfitState = {
  status: 'initial',
};

const skinTones = ['Fair', 'Light', 'Medium', 'Tan', 'Dark', 'Deep'];
const faceShapes = ['Oval', 'Round', 'Square', 'Heart', 'Diamond', 'Long'];
const bodyShapes = ['Apple', 'Pear', 'Rectangle', 'Hourglass', 'Inverted Triangle'];

export function StyleGuide() {
  const [state, setState] = useState<SuggestOutfitState>(initialState);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('manual');
  
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
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ status: 'loading' });
    const formData = new FormData(event.currentTarget);
    const submissionType = formData.get('submissionType') as string;

    try {
      if (submissionType === 'manual') {
        const input = {
          skinTone: formData.get('skinTone') as string,
          faceShape: formData.get('faceShape') as string,
          bodyShape: formData.get('bodyShape') as string,
          gender: formData.get('gender') as 'male' | 'female',
        };
        const result = await runFlow<typeof suggestOutfitFlow>({
          url: '/api/suggest-outfit',
          input,
        });
        setState({ status: 'success', result });
      } else {
        const file = formData.get('styleImage') as File;
        const reader = new FileReader();
        reader.onloadend = async () => {
          const photoDataUri = reader.result as string;
          const result = await runFlow<typeof suggestOutfitFromPhotoFlow>({
            url: '/api/suggest-outfit-from-photo',
            input: { photoDataUri },
          });
          setState({ status: 'success', result });
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      setState({ status: 'error', message: (error as Error).message });
    }
  };

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Style Guide Ready!",
        description: "Your personalized suggestions are here.",
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
        <CardTitle className="font-headline text-2xl">Personalized Style Guide</CardTitle>
        <CardDescription className="font-body">
          Receive personalized color palettes and outfit recommendations that highlight your best features.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
       <form ref={formRef} onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-primary/10 p-1 h-auto rounded-lg">
             <TabsTrigger value="manual" className="py-2.5 text-sm md:text-base flex items-center gap-2 rounded-md transition-all duration-300">
                <Edit className="w-5 h-5" />
                <span>Manual Input</span>
            </TabsTrigger>
            <TabsTrigger value="photo" className="py-2.5 text-sm md:text-base flex items-center gap-2 rounded-md transition-all duration-300">
                <Upload className="w-5 h-5" />
                <span>Upload Photo</span>
            </TabsTrigger>
          </TabsList>
            <input type="hidden" name="submissionType" value={activeTab} />
            <TabsContent value="manual" className="mt-6 animate-in fade-in-50 zoom-in-95 data-[state=inactive]:hidden">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="skinTone">Skin Tone</Label>
                      <Select name="skinTone" required={activeTab === 'manual'}>
                        <SelectTrigger id="skinTone"><SelectValue placeholder="Select your skin tone" /></SelectTrigger>
                        <SelectContent>{skinTones.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                      </Select>
                      {state.errors?.skinTone && (
                        <p className="text-sm text-destructive">{state.errors.skinTone[0]}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="faceShape">Face Shape</Label>
                      <Select name="faceShape" required={activeTab === 'manual'}>
                        <SelectTrigger id="faceShape"><SelectValue placeholder="Select your face shape" /></SelectTrigger>
                        <SelectContent>{faceShapes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                       {state.errors?.faceShape && (
                        <p className="text-sm text-destructive">{state.errors.faceShape[0]}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bodyShape">Body Shape</Label>
                      <Select name="bodyShape" required={activeTab === 'manual'}>
                        <SelectTrigger id="bodyShape"><SelectValue placeholder="Select your body shape" /></SelectTrigger>
                        <SelectContent>{bodyShapes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                       {state.errors?.bodyShape && (
                        <p className="text-sm text-destructive">{state.errors.bodyShape[0]}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup name="gender" required={activeTab === 'manual'} className="flex items-center gap-4 pt-2">
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
            </TabsContent>
            <TabsContent value="photo" className="mt-6 animate-in fade-in-50 zoom-in-95 data-[state=inactive]:hidden">
                <div className="space-y-2">
                  <Label htmlFor="styleImage">Upload Your Photo</Label>
                  <Input id="styleImage" name="styleImage" type="file" accept="image/*" required={activeTab === 'photo'} onChange={handleImageChange} />
                  {state.errors?.styleImage && (
                    <p className="text-sm text-destructive">{state.errors.styleImage[0]}</p>
                  )}
                </div>

                {imagePreview && (
                  <div className="relative w-full max-w-sm mx-auto aspect-[3/4] rounded-lg overflow-hidden border-2 border-dashed border-primary/50 mt-4">
                    <Image src={imagePreview} alt="Style preview" layout="fill" objectFit="cover" />
                  </div>
                )}
            </TabsContent>
        </Tabs>
        <SubmitButton className="w-full mt-4" pendingText={activeTab === 'manual' ? "Generating..." : "Analyzing..."} pending={state.status === 'loading'}>Get My Style Guide</SubmitButton>
        </form>

        {(state.status === 'success' && state.result) && (
          <div className="space-y-6 animate-in fade-in-50 pt-4">
            <Card className="bg-primary/5">
              <CardHeader>
                 <div className="flex items-center gap-2">
                    <Palette className="w-6 h-6 text-primary" />
                    <CardTitle className="font-headline text-xl">Color Palette</CardTitle>
                 </div>
                 <CardDescription>Colors that will complement your features.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {state.result.colorPalette.map((color, index) => (
                    <div key={index} className="flex items-center gap-2 font-mono text-sm">
                      <div className="w-8 h-8 rounded-full border-2 border-white/50 shadow-md" style={{ backgroundColor: color }} />
                      <span>{color}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-primary/5">
              <CardHeader>
                 <div className="flex items-center gap-2">
                    <Shirt className="w-6 h-6 text-primary" />
                    <CardTitle className="font-headline text-xl">Outfit Suggestions</CardTitle>
                 </div>
                 <CardDescription>A complete look tailored just for you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 font-body">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-full mt-1"><CaseUpper className="w-4 h-4 text-primary" /></div>
                    <div>
                        <h4 className="font-semibold text-foreground">Top</h4>
                        <p className="text-muted-foreground">{state.result.outfitSuggestion.top}</p>
                    </div>
                </div>
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-full mt-1"><CaseUpper className="w-4 h-4 text-primary -scale-y-100" /></div>
                    <div>
                        <h4 className="font-semibold text-foreground">Bottom</h4>
                        <p className="text-muted-foreground">{state.result.outfitSuggestion.bottom}</p>
                    </div>
                </div>
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-full mt-1"><Glasses className="w-4 h-4 text-primary" /></div>
                    <div>
                        <h4 className="font-semibold text-foreground">Wearables</h4>
                        <p className="text-muted-foreground">{state.result.outfitSuggestion.wearables}</p>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {state.status === 'initial' && (
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
