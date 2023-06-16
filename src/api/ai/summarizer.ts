import { chat } from "../../openai/main";
import { ChatSettings } from "../../types/openai";
import { ApiResponse } from "../../types/rest";

type SummaryQuery = {
  text: string;
  prevSummary?: string;
};

export async function generateSummary(
  query: SummaryQuery,
  settings?: ChatSettings
): Promise<ApiResponse> {
  const chatSettings: ChatSettings = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Your job is to provide a concise list of notes on the article being written, as it is being written. 
        The user will provide you with the text that needs to be turned into notes, please keep the list of notes short with only the key discussion points..`,
      },
      {
        role: "user",
        content: `
            Article Section: ${query.text}
        `,
      },
    ],
    ...settings,
  };

  try {
    const response = await chat(chatSettings);
    console.log(response);

    if (!response.success) {
      return {
        data: null,
        success: false,
        error: response.error,
      };
    }

    const summary = response.data;

    if (!summary) {
      return {
        data: null,
        success: false,
        error: "No summary generated",
      };
    }

    return {
      data: summary,
      success: true,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      success: false,
      error: error.message,
    };
  }
}

export async function shortenNotes(notes: string) {
  const chatSettings: ChatSettings = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `I will provide you with a unparsed data, it could be a JSON string containing notes and summaries, or just plain text. 
        I need you to shorten it into a concise list of notes so that I can use them later for writing an article. Please remove any duplicate information, and only keep important points. You may not use more than 50 notes in total. Try and keep all notes to under 3 short sentences.`,
      },
      {
        role: "user",
        content: `
            Notes: ${notes}
        `,
      },
    ],
  };

  try {
    const response = await chat(chatSettings);
    console.log(response);

    if (!response.success) {
      return {
        data: null,
        success: false,
        error: response.error,
      };
    }

    const summary = response.data;

    if (!summary) {
      return {
        data: null,
        success: false,
        error: "No summary generated",
      };
    }

    return {
      data: summary,
      success: true,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      success: false,
      error: error.message,
    };
  }
}
