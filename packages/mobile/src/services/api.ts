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
    // For development/testing - use mock response for valid codes
    if (code.startsWith('PNR-') && code.length >= 8) {
      console.log(`🧪 Mock activation for code: ${code}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful response
      return {
        success: true,
        profile: {
          id: `profile_${code.replace(/[^A-Z0-9]/g, '')}`,
          userId: `user_${code.replace(/[^A-Z0-9]/g, '')}`,
          personalManual: "Welcome to your personal advisory council!",
          warriorName: "Seeker",
          council: [
            {
              id: "voice_1",
              name: "The Sage",
              title: "Wisdom Keeper",
              specialty: "Life Guidance",
              description: "Ancient wisdom for modern challenges",
              avatar: "sage",
              systemPrompt: "You are a wise sage...",
              tokenCap: 1000
            }
          ],
          encryptedData: "mock_encrypted_data",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      };
    }
    
    // Invalid code
    return {
      success: false,
      error: "Invalid or expired activation code"
    };

    // Original API call (commented out for testing)
    // const deviceId = this.generateDeviceId();
    // const request = { 
    //   activationCode: code,
    //   deviceId: deviceId
    // };
    // return this.makeRequest<ActivationResponse>('/activate', {
    //   method: 'POST',
    //   body: JSON.stringify(request),
    // });
  }

  private generateDeviceId(): string {
    // Generate a unique device identifier
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 15);
    return `mobile_${timestamp}_${random}`;
  }


  async getUsageStats(): Promise<UsageStats> {
    // Mock usage stats for testing
    console.log('🧪 Mock usage stats');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      totalTurns: 47,
      turnsToday: 3,
      turnsThisMonth: 23,
      lastTurnAt: new Date()
    };

    // Original API call (commented out for testing)
    // return this.makeRequest<UsageStats>('/usage', {
    //   method: 'GET',
    // });
  }

  async sendChatMessage(message: string, threadId?: string, imageBase64?: string): Promise<ChatResponse> {
    // Mock chat response for testing
    console.log('🧪 Mock chat message:', message);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockThreadId = threadId || `thread_${Date.now()}`;
    
    return {
      success: true,
      threadId: mockThreadId,
      voiceResponses: [
        {
          voiceId: "sage_1",
          voiceName: "The Sage",
          content: `Wise words about "${message}". Consider the deeper meaning behind your question and how it relates to your personal growth.`,
          tokenCount: 45,
          timestamp: new Date()
        },
        {
          voiceId: "warrior_1", 
          voiceName: "The Warrior",
          content: `Take action on "${message}". Sometimes the best path forward is to move with courage and determination.`,
          tokenCount: 38,
          timestamp: new Date()
        }
      ],
      synthesis: {
        content: `Your council has spoken about "${message}". The Sage reminds you to reflect deeply, while the Warrior encourages bold action. Balance wisdom with courage as you move forward.`,
        nextSteps: [
          "Reflect on the deeper meaning",
          "Take one concrete action today",
          "Journal about your insights"
        ],
        reassurance: "You have the wisdom and strength to handle whatever comes your way.",
        tokenCount: 67,
        timestamp: new Date()
      }
    };

    // Original API call (commented out for testing)
    // const request: ChatRequest = { message, threadId, imageBase64 };
    // return this.makeRequest<ChatResponse>('/chat', {
    //   method: 'POST',
    //   body: JSON.stringify(request),
    // });
  }

  async requestVoiceSwap(voiceId: string, reason: string): Promise<{ success: boolean }> {
    // Mock voice swap for testing
    console.log('🧪 Mock voice swap request');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true };

    // Original API call (commented out for testing)
    // return this.makeRequest<{ success: boolean }>('/swap-request', {
    //   method: 'POST',
    //   body: JSON.stringify({ voiceId, reason }),
    // });
  }

  async checkSubscription(): Promise<{ active: boolean; expiresAt?: string }> {
    // Mock subscription check for testing
    console.log('🧪 Mock subscription check');
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 1); // 1 month from now
    
    return { 
      active: true, 
      expiresAt: expiresAt.toISOString() 
    };

    // Original API call (commented out for testing)
    // return this.makeRequest<{ active: boolean; expiresAt?: string }>('/subscription/check', {
    //   method: 'GET',
    // });
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
