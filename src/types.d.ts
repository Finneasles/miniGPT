interface Message {
  text: string;
  date: string;
  sender: string;
}

interface Conversation {
  name: string;
  messages: Message[];
}

interface OpenAiRequest {
  model: string;
  prompt: string;
  temperature: number;
  max_tokens: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
}