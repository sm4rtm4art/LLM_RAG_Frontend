'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/i18n-context';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUploader } from './file-uploader';
import { TextComparisonView } from './text-comparison-view';
import { TextExtractionView } from './text-extraction-view';
import { ComparisonViewSelector } from './comparison-view-selector';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, FileText } from 'lucide-react';
import {
  compareTexts,
  extractImportantParts,
} from '@/lib/text-comparison/text-comparison-utils';
import type {
  ComparisonResult,
  TextFile,
  ViewMode,
} from '@/types/text-comparison';

export function TextComparisonInterface() {
  const { t } = useI18n();
  const [file1, setFile1] = useState<TextFile | null>(null);
  const [file2, setFile2] = useState<TextFile | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [comparisonResult, setComparisonResult] =
    useState<ComparisonResult | null>(null);
  const [extractionResult, setExtractionResult] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (file: File, fileNumber: 1 | 2) => {
    const reader = new FileReader();
    reader.onload = e => {
      const content = e.target?.result as string;
      if (fileNumber === 1) {
        setFile1({
          name: file.name,
          content,
          type: file.type,
        });
      } else {
        setFile2({
          name: file.name,
          content,
          type: file.type,
        });
      }
    };
    reader.onerror = () => {
      setError(t('common.error'));
    };
    reader.readAsText(file);
  };

  const handleCompare = async () => {
    if (!file1 || !file2) return;

    setIsComparing(true);
    setError(null);

    try {
      // In a real app, this might be an API call
      const result = await compareTexts(file1.content, file2.content);
      setComparisonResult(result);
      setExtractionResult(null);
    } catch (err) {
      setError(t('common.error'));
    } finally {
      setIsComparing(false);
    }
  };

  const handleExtract = async () => {
    if (!file1 || !file2) return;

    setIsExtracting(true);
    setError(null);

    try {
      // In a real app, this might be an API call
      const result = await extractImportantParts(file1.content, file2.content);
      setExtractionResult(result);
    } catch (err) {
      setError(t('common.error'));
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle>{t('textComparison.title')}</CardTitle>
          <CardDescription>
            {t('textComparison.uploadInstructions')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium mb-2">
                {t('textComparison.file1')}
              </h3>
              <FileUploader
                onFileUpload={file => handleFileUpload(file, 1)}
                fileSelected={!!file1}
                fileName={file1?.name}
              />
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">
                {t('textComparison.file2')}
              </h3>
              <FileUploader
                onFileUpload={file => handleFileUpload(file, 2)}
                fileSelected={!!file2}
                fileName={file2?.name}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-between items-center">
            <div className="flex gap-2">
              <Button
                onClick={handleCompare}
                disabled={!file1 || !file2 || isComparing}
                className="flex items-center gap-1"
              >
                <FileText className="h-4 w-4" />
                {t('textComparison.compareButton')}
              </Button>
              <Button
                onClick={handleExtract}
                disabled={!file1 || !file2 || isExtracting}
                variant="outline"
                className="flex items-center gap-1"
              >
                {t('textComparison.extractButton')}
              </Button>
            </div>

            {comparisonResult && (
              <ComparisonViewSelector
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
            )}
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isComparing && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {t('textComparison.loadingComparison')}
              </p>
            </div>
          )}

          {isExtracting && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {t('textComparison.processingFiles')}
              </p>
            </div>
          )}

          {comparisonResult && !extractionResult && (
            <div className="mt-6">
              <TextComparisonView
                file1={file1}
                file2={file2}
                comparisonResult={comparisonResult}
                viewMode={viewMode}
              />
            </div>
          )}

          {extractionResult && (
            <div className="mt-6">
              <TextExtractionView extractionResult={extractionResult} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
