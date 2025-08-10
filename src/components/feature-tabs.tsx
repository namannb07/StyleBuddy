// @/components/feature-tabs.tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OutfitRater } from "@/components/outfit-rater";
import { StyleGuide } from "@/components/style-guide";
import { HairstyleHelper } from "@/components/hairstyle-helper";
import { Shirt, Palette, Scissors } from "lucide-react";

export function FeatureTabs() {
  return (
    <Tabs defaultValue="outfit-rater" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-primary/10 p-1 h-auto rounded-lg">
        <TabsTrigger value="outfit-rater" className="py-2.5 text-sm md:text-base flex items-center gap-2 rounded-md">
          <Shirt className="w-5 h-5" />
          <span className="hidden sm:inline">Outfit Rater</span>
        </TabsTrigger>
        <TabsTrigger value="style-guide" className="py-2.5 text-sm md:text-base flex items-center gap-2 rounded-md">
          <Palette className="w-5 h-5" />
          <span className="hidden sm:inline">Style Guide</span>
        </TabsTrigger>
        <TabsTrigger value="hairstyle-helper" className="py-2.5 text-sm md:text-base flex items-center gap-2 rounded-md">
          <Scissors className="w-5 h-5" />
          <span className="hidden sm:inline">Hairstyle Helper</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="outfit-rater" className="mt-6">
        <OutfitRater />
      </TabsContent>
      <TabsContent value="style-guide" className="mt-6">
        <StyleGuide />
      </TabsContent>
      <TabsContent value="hairstyle-helper" className="mt-6">
        <HairstyleHelper />
      </TabsContent>
    </Tabs>
  );
}
