import { 
  ActivationRequest, 
  ActivationResponse, 
  ChatRequest, 
  ChatResponse,
  Profile,
  UsageStats 
} from '../types';

const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api' 
  : 'https://your-production-api.vercel.app/api';

class ApiService {
  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async activateProfile(code: string): Promise<ActivationResponse> {
    const request: ActivationRequest = { code };
    
    return this.makeRequest<ActivationResponse>('/activate', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async sendChatMessage(message: string, threadId?: string, imageBase64?: string): Promise<ChatResponse> {
    const request: ChatRequest = { message, threadId, imageBase64 };
    
    return this.makeRequest<ChatResponse>('/chat', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getUsageStats(): Promise<UsageStats> {
    return this.makeRequest<UsageStats>('/usage', {
      method: 'GET',
    });
  }

  async requestVoiceSwap(voiceId: string, reason: string): Promise<{ success: boolean }> {
    return this.makeRequest<{ success: boolean }>('/swap-request', {
      method: 'POST',
      body: JSON.stringify({ voiceId, reason }),
    });
  }

  async checkSubscription(): Promise<{ active: boolean; expiresAt?: string }> {
    return this.makeRequest<{ active: boolean; expiresAt?: string }>('/subscription/check', {
      method: 'GET',
    });
  }
}

export const apiService = new ApiService();

// Convenience functions
export const activateProfile = (code: string) => apiService.activateProfile(code);
export const sendChatMessage = (message: string, threadId?: string, imageBase64?: string) => 
  apiService.sendChatMessage(message, threadId, imageBase64);
export const getUsageStats = () => apiService.getUsageStats();
export const requestVoiceSwap = (voiceId: string, reason: string) => 
  apiService.requestVoiceSwap(voiceId, reason);
export const checkSubscription = () => apiService.checkSubscription();
