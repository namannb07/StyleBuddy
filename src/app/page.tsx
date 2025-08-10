import { FeatureTabs } from "@/components/feature-tabs";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-5xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-2">
             <Sparkles className="text-primary w-8 h-8 -scale-x-100" />
             <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-foreground tracking-wide">
               StyleBuddy
             </h1>
             <Sparkles className="text-primary w-8 h-8" />
          </div>
          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto">
            Your personal AI-powered style assistant. Get instant feedback on your outfits, personalized style guidance, and hairstyle suggestions.
          </p>
        </header>
        
        <FeatureTabs />

      </div>
    </main>
  );
}
