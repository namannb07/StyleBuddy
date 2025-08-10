// src/components/footer.tsx
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full mt-auto py-8">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p className="flex items-center justify-center gap-1.5 font-body">
          Made with <Heart className="w-4 h-4 text-primary fill-current" /> by the StyleBuddy Team
        </p>
      </div>
    </footer>
  );
}
