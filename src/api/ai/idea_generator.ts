import { chat } from "../../openai/main";
import { ChatSettings } from "../../types/openai";
import { ApiResponse } from "../../types/rest";

type IdeaQuery = {
  query: string;
  amount?: number;
};

export async function generateArticleIdeas(
  query: IdeaQuery,
  settings?: ChatSettings
): Promise<ApiResponse> {
  const chatSettings: ChatSettings = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Your job is to provide a list of article ideas for blog posts based off of a users query. Their query could be a set of keywords, a sentence or even a subject. 
          All list items should start with ->
          `,
      },
      { role: "user", content: "Party, supplies, best" },
      {
        role: "assistant",
        content: `
            -> Discover the Best Party Supplies for a Memorable Event
            -> Essential Party Supplies for the Best Celebration of the Year
            -> Why Quality Party Supplies are the Key to Hosting the Best Events
            -> Ten Top-Rated Party Supplies for an Unforgettable Gathering
            -> Making Your Parties Stand Out: A Guide to the Best Supplies
            -> Elevate Your Celebrations: The Best Party Supplies of 2023
            -> Transform Your Events with These Best-In-Class Party Supplies
            -> Creating a Perfect Party Atmosphere: The Role of the Best Supplies
            -> How to Choose the Best Supplies for Your Next Party
            -> A Review of the Best Eco-Friendly Party Supplies on the Market`,
      },
      {
        role: "user",
        content: `
            Number of list items: ${query.amount || 10}
            Query: ${query.query}
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

    return {
      data: response.data,
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
