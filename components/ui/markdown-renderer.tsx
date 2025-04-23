'use client';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { useState } from 'react';
import { useI18n } from '@/lib/i18n/i18n-context';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const { t } = useI18n();

  return (
    <ReactMarkdown
      className="prose prose-sm dark:prose-invert max-w-none"
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        img({ src, alt, width, height }) {
          return (
            <MarkdownImage src={src} alt={alt} width={width} height={height} />
          );
        },
        table({ children }) {
          return (
            <div className="overflow-x-auto">
              <table className="border-collapse border border-slate-300 dark:border-slate-600 w-full">
                {children}
              </table>
            </div>
          );
        },
        th({ children }) {
          return (
            <th className="border border-slate-300 dark:border-slate-600 bg-slate-200 dark:bg-slate-700 p-2 text-left">
              {children}
            </th>
          );
        },
        td({ children }) {
          return (
            <td className="border border-slate-300 dark:border-slate-600 p-2">
              {children}
            </td>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

interface MarkdownImageProps {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
}

function MarkdownImage({ src, alt, width, height }: MarkdownImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { t } = useI18n();

  if (!src) return null;

  if (error) {
    return (
      <div className="my-4 flex items-center justify-center h-32 bg-slate-200 dark:bg-slate-700 rounded-md">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {t('common.imageLoadError')}
        </p>
      </div>
    );
  }

  return (
    <div className="my-4 relative">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-md">
          <div className="animate-pulse h-full w-full rounded-md bg-slate-300 dark:bg-slate-600" />
        </div>
      )}
      <img
        src={src || '/placeholder.svg'}
        alt={alt || ''}
        className="max-w-full h-auto rounded-md"
        width={width ? Number(width) : undefined}
        height={height ? Number(height) : undefined}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        style={{ display: loaded ? 'block' : 'block' }}
      />
    </div>
  );
}
