export interface RetrievedDocumentMetadata {
  source?: string | null
  filename?: string | null
  chunk_index?: number | null
  confidence?: number
  additional_metadata?: Record<string, any> | null
}

export interface RetrievedDocument {
  content: string
  metadata: RetrievedDocumentMetadata
}

export interface QueryRequest {
  query: string
  top_k?: number
}

export interface QueryResponse {
  query: string
  response: string
  retrieved_documents: RetrievedDocument[]
}

export interface ConversationRequest {
  query: string
  conversation_id?: string | null
  top_k?: number
}

export interface ConversationTurn {
  user: string
  assistant: string
}

export interface ConversationResponse {
  query: string
  response: string
  retrieved_documents: RetrievedDocument[]
  conversation_id: string
  history: ConversationTurn[]
}
