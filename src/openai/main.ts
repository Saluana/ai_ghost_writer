import { Configuration, OpenAIApi } from "openai";
import { ApiResponse } from "../types/rest";
import { ChatSettings } from "../types/openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

export async function chat(settings: ChatSettings): Promise<ApiResponse> {
  let response: ApiResponse = {
    data: null,
    success: false,
    error: "No response from OpenAI",
  };

  try {
    const res = await openai.createChatCompletion(settings);

    if (
      res &&
      res.data &&
      res.data.choices[0] &&
      res.data.choices[0].message.content
    ) {
      response = {
        data: res.data.choices[0].message.content,
        success: true,
        error: null,
      };
    }
  } catch (error) {
    console.log(error);

    response = {
      data: null,
      success: false,
      error: error.message,
    };
  }

  return response;
}
