
export interface OpenRouterMessage {
  role: "user" | "assistant";
  content: string;
}

export async function fetchOpenRouterChat(
  apiKey: string,
  messages: OpenRouterMessage[],
  signal?: AbortSignal
): Promise<string> {
  // Following OpenRouter API pattern, adapt as needed
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openchat/openchat-3.5-1210", // You can let user pick later!
      messages: messages.map(({ role, content }) => ({ role, content }))
    }),
    signal
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`API error: ${res.status} - ${detail}`);
  }

  // assuming OpenRouter mostly follows OpenAI Chat API, otherwise adjust!
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "No response from model.";
}
