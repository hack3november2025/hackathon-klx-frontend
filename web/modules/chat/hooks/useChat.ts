// /home/hack3-vl03-user/KLx/hackathon-klx-frontend/web/modules/chat/hooks/useChat.ts
"use client";

import { ChatAnswer } from "@/types";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { getChatAnswer, vectorizeQuery } from "../services/chat-service";

interface ChatState {
  answer: ChatAnswer | null;
  loading: boolean;
}

interface Handler<T, R = void> {
  props: T;
  onSuccess?: (response: R) => void;
  onError?: (error: Error) => void;
}

export const useChat = () => {
  const [state, setState] = useState<ChatState>({
    answer: null,
    loading: false,
  });

  const handleSetState = useCallback((newState: Partial<ChatState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  }, []);

  const handleQuery = useCallback(
    async ({
      props,
      onSuccess,
      onError,
    }: Handler<{ query: string }, ChatAnswer>) => {
      if (!props.query.trim()) return;

      handleSetState({ loading: true, answer: null });

      try {
        // Passo 1: Vetorizar a Query (apenas para simular o endpoint)
        // await vectorizeQuery(props);

        // Passo 2: Obter a resposta completa
        const result = await getChatAnswer(props);

        handleSetState({ answer: result });
        toast.success("Query processed! AI response received.");

        if (onSuccess) {
          onSuccess(result);
        }

        return result;
      } catch (error) {
        console.error("Chat Query Error:", error);
        toast.error(`Error querying CV Database: ${(error as Error).message}`);

        if (onError) {
          onError(error as Error);
        }
      } finally {
        handleSetState({ loading: false });
      }
    },
    [handleSetState]
  );

  return {
    answer: state.answer,
    loading: state.loading,
    handleQuery,
  };
};
