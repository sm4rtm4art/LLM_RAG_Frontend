'use client';

import type {
  QueryRequest,
  QueryResponse,
  ConversationRequest,
  ConversationResponse,
} from '@/types/api';

class ApiService {
  private baseUrl: string;

  constructor() {
    // In a real app, this would come from environment variables
    this.baseUrl = '/api';
  }

  async sendQuery(request: QueryRequest): Promise<QueryResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending query:', error);
      throw error;
    }
  }

  async sendConversationMessage(
    request: ConversationRequest
  ): Promise<ConversationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/conversation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending conversation message:', error);
      throw error;
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export const apiService = new ApiService();
