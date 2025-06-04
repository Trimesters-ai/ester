import { create } from 'zustand';
import { ChatMessage, UserProfile, WhoopUser } from '../types';

interface Store {
  user: UserProfile | null;
  whoopConnection: WhoopUser | null;
  messages: ChatMessage[];
  setUser: (user: UserProfile | null) => void;
  setWhoopConnection: (connection: WhoopUser | null) => void;
  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  whoopConnection: null,
  messages: [],
  setUser: (user) => set({ user }),
  setWhoopConnection: (connection) => set({ whoopConnection: connection }),
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  setMessages: (messages) => set({ messages }),
}));