export interface WhoopUser {
  id: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  userId: string;
  isAI: boolean;
  whoopData?: {
    recovery: number;
    sleep: number;
    strain: number;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  pregnancyDueDate?: string;
  postpartumDate?: string;
  name?: string;
  openaiApiKey?: string;
}