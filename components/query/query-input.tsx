'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18n-context';

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export function QueryInput({ onSubmit, isLoading }: QueryInputProps) {
  const [query, setQuery] = useState('');
  const { t } = useI18n();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus the textarea when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmit(query);
      // Re-focus the textarea after submission
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t('query.inputPlaceholder')}
          className="min-h-[100px] resize-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
          disabled={isLoading}
          style={{ caretColor: '#3b82f6' }} // Visible cursor color
        />
        {query.length === 0 && (
          <div className="absolute top-3 left-3 pointer-events-none text-muted-foreground opacity-60">
            <span className="animate-pulse">|</span>
          </div>
        )}
      </div>
      <Button
        type="submit"
        className="self-end transition-all hover:scale-105"
        disabled={isLoading || !query.trim()}
      >
        <Send className="h-4 w-4 mr-2" />
        {t('query.sendQuery')}
      </Button>
    </form>
  );
}
