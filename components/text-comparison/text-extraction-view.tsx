'use client';

import { useI18n } from '@/lib/i18n/i18n-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MarkdownRenderer } from '../ui/markdown-renderer';

interface TextExtractionViewProps {
  extractionResult: string;
}

export function TextExtractionView({
  extractionResult,
}: TextExtractionViewProps) {
  const { t } = useI18n();

  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-sm">{t('common.importantParts')}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] p-4">
          <MarkdownRenderer content={extractionResult} />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
