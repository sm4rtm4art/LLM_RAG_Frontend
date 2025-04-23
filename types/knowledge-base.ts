export interface KnowledgeArticleType {
  id: string
  title: string
  content: string
  summary?: string
  category: string
  tags: string[]
  date: string
  author?: string
}
