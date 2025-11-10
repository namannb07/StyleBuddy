'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, ArrowLeft, Bookmark } from 'lucide-react';
import Link from 'next/link';

interface SavedStyle {
  id: string;
  imageUrl: string;
  feedback: string;
  suggestions: string;
  createdAt: string;
}

export default function SavedStylesPage() {
  const [savedStyles, setSavedStyles] = useState<SavedStyle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, token } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    fetchSavedStyles();
  }, [isAuthenticated, router]);

  const fetchSavedStyles = async () => {
    if (!token) return;

    try {
      const response = await fetch('/api/saved-styles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch saved styles');
      }

      setSavedStyles(data.savedStyles || []);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load saved styles',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Bookmark className="text-primary w-8 h-8" />
            <h1 className="text-4xl sm:text-5xl font-headline font-bold">Saved Styles</h1>
          </div>
          <p className="text-lg text-muted-foreground font-body">
            Your collection of AI-powered style recommendations
          </p>
        </div>

        {savedStyles.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bookmark className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-headline mb-2">No saved styles yet</h3>
              <p className="text-muted-foreground font-body mb-4 text-center">
                Start using StyleBuddy's AI features and save your favorite recommendations!
              </p>
              <Link href="/">
                <Button>Explore StyleBuddy</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedStyles.map((style) => (
              <Card key={style.id} className="overflow-hidden">
                <div className="relative w-full aspect-square">
                  <Image
                    src={style.imageUrl}
                    alt="Saved style"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-lg">Style Recommendation</CardTitle>
                  <CardDescription className="font-body text-xs">
                    {new Date(style.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-headline text-sm font-semibold mb-1">Feedback</h4>
                    <p className="font-body text-sm text-muted-foreground">{style.feedback}</p>
                  </div>
                  <div>
                    <h4 className="font-headline text-sm font-semibold mb-1">Suggestions</h4>
                    <p className="font-body text-sm text-muted-foreground">{style.suggestions}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

