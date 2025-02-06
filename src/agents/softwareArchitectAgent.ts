import { OpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import type {
  ChatCompletionMessageParam,
  ChatCompletionSystemMessageParam,
  ChatCompletionUserMessageParam,
} from "openai/resources/chat";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Main agent function
async function architectAgent<T>(userInput: string, schema?: z.ZodSchema<T>) {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        "You are an expert software architect. Help users analyze, generate, and evaluate software architectures.",
    } as ChatCompletionSystemMessageParam,
    {
      role: "user",
      content: userInput,
    } as ChatCompletionUserMessageParam,
  ];

  if (schema) {
    // Use structured output with schema
    const response = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages,
      response_format: zodResponseFormat(schema, "architecture"),
    });

    const { message } = response.choices[0];
    return message.parsed;
  } else {
    // Use regular completion without schema
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });

    const { message } = response.choices[0];
    return message.content;
  }
}

export { architectAgent };
