"use client";
import { FeatureTabs } from "@/components/feature-tabs";
import Footer from "@/components/footer";
import { HowToUse } from "@/components/how-to-use";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export default function PageContent() {
  const t = useTranslations("Header");
  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
        <div className="w-full max-w-5xl mx-auto">
          <header className="relative text-center mb-8 md:mb-12">
            <div className="absolute top-0 right-0">
              <LanguageSwitcher />
            </div>
            <div className="inline-flex items-center justify-center gap-3 mb-2">
               <Sparkles className="text-primary w-8 h-8 -scale-x-100" />
               <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-foreground tracking-wide">
                 {t('title')}
               </h1>
               <Sparkles className="text-primary w-8 h-8" />
            </div>
            <p className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto">
              {t('description')}
            </p>
          </header>
          
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <FeatureTabs />
          </div>

          <HowToUse />
        </div>
      </main>
      <Footer />
    </>
  );
}
