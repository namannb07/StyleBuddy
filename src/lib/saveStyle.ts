import { useAuth } from '@/contexts/AuthContext';

export interface SaveStyleData {
  imageUrl: string;
  feedback: string;
  suggestions: string;
}

export async function saveStyle(data: SaveStyleData, token: string | null): Promise<{ success: boolean; error?: string }> {
  if (!token) {
    return { success: false, error: 'You must be logged in to save styles' };
  }

  try {
    const response = await fetch('/api/saved-styles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.error || 'Failed to save style' };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Failed to save style' };
  }
}

