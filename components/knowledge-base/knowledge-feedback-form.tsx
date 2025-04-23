'use client';

import type React from 'react';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/i18n-context';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface KnowledgeFeedbackFormProps {
  articleId: string;
  onSubmit: (articleId: string, isHelpful: boolean, comment: string) => void;
  onCancel: () => void;
}

export function KnowledgeFeedbackForm({
  articleId,
  onSubmit,
  onCancel,
}: KnowledgeFeedbackFormProps) {
  const { t } = useI18n();
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isHelpful !== null) {
      onSubmit(articleId, isHelpful, comment);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">
        {t('knowledgeBase.feedback.title')}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm">{t('knowledgeBase.feedback.helpful')}</p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={isHelpful === true ? 'default' : 'outline'}
              size="sm"
              onClick={() => setIsHelpful(true)}
              className="flex items-center gap-1"
            >
              <ThumbsUp className="h-4 w-4" />
              {t('common.helpful')}
            </Button>
            <Button
              type="button"
              variant={isHelpful === false ? 'default' : 'outline'}
              size="sm"
              onClick={() => setIsHelpful(false)}
              className="flex items-center gap-1"
            >
              <ThumbsDown className="h-4 w-4" />
              {t('common.notHelpful')}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm">{t('knowledgeBase.feedback.suggestion')}</p>
          <Textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
          <Button type="submit" disabled={isHelpful === null}>
            {t('common.submit')}
          </Button>
        </div>
      </form>
    </div>
  );
}
