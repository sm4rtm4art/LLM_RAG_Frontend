export interface KnowledgeArticleType {
  id: string
  title: string
  content: string
  summary?: string
  category: string
  tags: string[]
  date: string
  author?: string
  documents?: DocumentAttachment[]
}

export interface DocumentAttachment {
  id: string
  filename: string
  title?: string
  type: string
  size: number
  url?: string
  dateAdded: string
}
