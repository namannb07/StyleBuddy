// @/components/how-to-use.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shirt, Palette, Scissors, Lightbulb } from "lucide-react";

const features = [
    {
        icon: <Shirt className="w-8 h-8 text-primary" />,
        title: "Outfit Rater",
        description: "Upload a photo of your outfit and get an instant rating from 1 to 10, along with constructive feedback from our AI stylist.",
    },
    {
        icon: <Palette className="w-8 h-8 text-primary" />,
        title: "Style Guide",
        description: "Get personalized style advice. Either input your details manually or upload a photo, and receive suggestions for colors and outfits that suit you.",
    },
    {
        icon: <Scissors className="w-8 h-8 text-primary" />,
        title: "Hairstyle Helper",
        description: "Find your next look. Upload a photo of your face, select your gender, and discover hairstyles that complement your face shape.",
    }
]

export function HowToUse() {
  return (
    <section className="w-full mt-16 md:mt-24">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-2">
             <Lightbulb className="text-primary w-8 h-8" />
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-foreground tracking-wide">
               How It Works
             </h2>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto">
            Three simple steps to elevate your style.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
                 <Card key={index} className="bg-card/50 text-center">
                    <CardHeader className="items-center">
                        <div className="p-4 bg-primary/10 rounded-full mb-2">
                           {feature.icon}
                        </div>
                        <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-body text-muted-foreground">{feature.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </section>
  );
}
