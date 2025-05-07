import type { RetrievedDocument } from "./api"

export enum MessageRole {
  USER = "user",
  ASSISTANT = "assistant",
}

export interface Message {
  role: MessageRole
  content: string
  retrievedDocuments?: RetrievedDocument[]
  hasAttachment?: boolean
}
