export interface ChatSettings {
  model: string;
  messages: ChatMessageItem[];
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  stop?: string[] | string;
  max_tokens?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  logit_bias?: Record<string, number>;
  user?: string;
}

export interface ChatMessageItem {
  role: "system" | "user" | "assistant";
  content: string;
  name?: string;
}
