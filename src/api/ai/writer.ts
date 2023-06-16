import { chat } from "../../openai/main";
import { ChatSettings } from "../../types/openai";
import { ApiResponse } from "../../types/rest";

type ArticleQuery = {
  keywords: string;
  outline: string;
  details: string;
  notes: string;
  formattingStyle: string;
  section: number;
  tone: string;
  summary: string;
};

export async function generateArticleSection(
  query: ArticleQuery,
  settings?: ChatSettings
): Promise<ApiResponse> {
  if (!query.outline) {
    return {
      data: null,
      success: false,
      error: "No outline provided",
    };
  }

  if (!query.section) {
    return {
      data: null,
      success: false,
      error: "No section provided.",
    };
  }

  const chatSettings: ChatSettings = {
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "system",
        content: `Your job is to help construct an article based off of information the user has provided. You will write the article section by section. The section you are writing is section ${
          query.section
        }. \n
        Article Outline: ${JSON.stringify(query.outline)}\n
        Article Details: ${query.details}\n
        Article Notes: ${query.notes}\n
        Article Formatting Style: ${query.formattingStyle}\n
        Article Tone: ${query.tone}\n
        Previous sections written: ${JSON.stringify(query.summary)}\n
        `,
      },
      {
        role: "user",
        content: `
        outline: ${JSON.stringify(query.outline)}\n\n
        Please start writing section ${
          query.section
        } of the article. DO NOT WRITE ANY OTHER SECTIONS BESIDES SECTION: ${
          query.section
        }. Reffer to the system message for more details.
        `,
      },
    ],
    ...settings,
  };

  try {
    const response = await chat(chatSettings);
    console.log(response);

    if (!response.success) {
      console.log(response.error);
      return {
        data: null,
        success: false,
        error: response.error,
      };
    }

    const section = response.data;

    if (!section) {
      return {
        data: null,
        success: false,
        error: "No summary generated",
      };
    }

    return {
      data: section,
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
