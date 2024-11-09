// stores/conversationStore.ts
import { create } from "zustand";

interface ConversationState {
  conversationId: string | null;
  recipientId: string | null;
  setConversation: (id: string, recipientId: string) => void;
  clearConversation: () => void;
}

const useConversationStore = create<ConversationState>((set) => ({
  conversationId: null,
  recipientId: null,
  setConversation: (id, recipientId) =>
    set(() => ({ conversationId: id, recipientId:recipientId })),
  clearConversation: () => set(() => ({ conversationId: null, recipientId: null })),
}));

export default useConversationStore;
