// @/components/submit-button.tsx
'use client';

import { useFormStatus } from 'react-dom';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type Props = ButtonProps & {
    pendingText?: string;
    pending?: boolean;
};

export function SubmitButton({ children, pendingText, pending: pendingProp, ...props }: Props) {
  const { pending: formStatusPending } = useFormStatus();
  const pending = pendingProp !== undefined ? pendingProp : formStatusPending;

  return (
    <Button {...props} type="submit" disabled={pending} aria-disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {pendingText || 'Please wait...'}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
