import { ChatAnswer } from "@/types";
import { toast } from "sonner";

const api_2 = process.env.NEXT_PUBLIC_API_URL_2;

interface QueryData {
  query: string;
}

export const vectorizeQuery = async (data: QueryData): Promise<void> => {
  const url = `${api_2}/vectorize`;
  toast.info(`Sending POST request to ${url}.`);
  console.log(`Sending POST request to ${url} with query: ${data.query}`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    toast.error(
      `Vectorize API returned status ${response.status}: ${response.statusText}`
    );
    throw new Error(
      `Vectorize API returned status ${response.status}: ${response.statusText}`
    );
  }
};

export const getChatAnswer = async (data: QueryData): Promise<ChatAnswer> => {
  // A API de chat no tem como 'lembrar' a ltima query,
  // ento vamos passar o prompt no body de uma requiso POST que
  // simula o GET/chat (para simplificar o CORS e envio de dados complexos).
  // Se o backend for estritamente um GET, voc precisar da URL:
  // const url = `${API_URL}/chat?query=${encodeURIComponent(data.query)}`;

  const url = `${api_2}/chat`;
  console.log(`Sending POST request to ${url} with query: ${data.query}`);

  const response = await fetch(url, {
    method: "POST", // Usando POST para enviar a query
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(
      `Chat API returned status ${response.status}: ${response.statusText}`
    );
  }

  const result: ChatAnswer = await response.json();
  return result;
};
