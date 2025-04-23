'use client';

import { useI18n } from '@/lib/i18n/i18n-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type {
  ComparisonResult,
  TextFile,
  ViewMode,
} from '@/types/text-comparison';

interface TextComparisonViewProps {
  file1: TextFile | null;
  file2: TextFile | null;
  comparisonResult: ComparisonResult;
  viewMode: ViewMode;
}

export function TextComparisonView({
  file1,
  file2,
  comparisonResult,
  viewMode,
}: TextComparisonViewProps) {
  const { t } = useI18n();

  if (!file1 || !file2) return null;

  const renderSplitView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm">{file1.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px] p-4">
            <pre className="text-xs whitespace-pre-wrap font-mono">
              {file1.content}
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm">{file2.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px] p-4">
            <pre className="text-xs whitespace-pre-wrap font-mono">
              {file2.content}
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );

  const renderOverlayView = () => (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-sm">{t('common.differences')}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] p-4">
          <div className="text-xs font-mono whitespace-pre-wrap">
            {comparisonResult.diffLines.map((line, index) => {
              if (line.added) {
                return (
                  <div
                    key={index}
                    className="bg-green-100 dark:bg-green-900/30"
                  >
                    {line.value}
                  </div>
                );
              }
              if (line.removed) {
                return (
                  <div key={index} className="bg-red-100 dark:bg-red-900/30">
                    {line.value}
                  </div>
                );
              }
              return <div key={index}>{line.value}</div>;
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  const renderCombinedView = () => (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-sm">{t('common.combinedView')}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] p-4">
          <div className="text-xs font-mono whitespace-pre-wrap">
            {comparisonResult.combinedText.map((part, index) => {
              let className = '';
              if (part.type === 'added') {
                className = 'bg-green-100 dark:bg-green-900/30';
              } else if (part.type === 'removed') {
                className = 'bg-red-100 dark:bg-red-900/30';
              }
              return (
                <span key={index} className={className}>
                  {part.text}
                </span>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  return (
    <div>
      {viewMode === 'split' && renderSplitView()}
      {viewMode === 'overlay' && renderOverlayView()}
      {viewMode === 'combined' && renderCombinedView()}
    </div>
  );
}
