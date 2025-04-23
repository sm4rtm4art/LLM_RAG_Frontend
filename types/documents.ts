export interface RetrievedDocumentMetadata {
  source?: string | null;
  filename?: string | null;
  chunk_index?: number | null;
  confidence?: number;
  content_type?: string;
  additional_metadata?: Record<string, any> | null;
}

export interface RetrievedDocument {
  content: string;
  metadata: RetrievedDocumentMetadata;
}

// Helper types for content types
export enum ContentType {
  TEXT = 'text',
  IMAGE = 'image',
  TABLE = 'table',
  CODE = 'code',
  OTHER = 'other',
}
