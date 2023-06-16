import { chat } from "../../openai/main";
import { ChatSettings } from "../../types/openai";
import { ApiResponse } from "../../types/rest";

type OutlineQuery = {
  query: string;
};

export async function generateArticleOutline(
  query: OutlineQuery,
  settings?: ChatSettings
): Promise<ApiResponse> {
  const chatSettings: ChatSettings = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Your job is to provide an article outline for blog posts based off of an article title, or idea. All article outlines must be formatted as valid JSON`,
      },
      {
        role: "user",
        content: "Discover the Best Party Supplies for a Memorable Event",
      },
      {
        role: "assistant",
        content: `[
  {
    "title": "Discover the Best Party Supplies for a Memorable Event",
    "content": [
      "Introduction to the importance of high-quality party supplies in making an event memorable",
      "Brief overview of what the article will cover"
    ],
    "type": "introduction",
    "section": 1
  },
  {
    "title": "The Role of Party Supplies in Event Planning",
    "content": [
      "Understanding how party supplies can enhance the mood and theme",
      "Discussing the impact of good party supplies on the guests' experience"
    ],
    "type": "section",
    "section": 2
  },
  {
    "title": "Key Components of the Best Party Supplies",
    "content": [
      "Quality and durability of party supplies",
      "Aesthetic considerations: matching theme and color schemes",
      "Functional items like tableware, decorations, and lighting"
    ],
    "type": "section",
    "section": 3
  },
  {
    "title": "Top-Rated Party Supplies for Different Themes",
    "content": [
      "Children's birthday party supplies",
      "Adult's birthday party supplies",
      "Holiday party supplies",
      "Special occasion (wedding, graduation, etc.) party supplies"
    ],
    "type": "section",
    "section": 4
  },
  {
    "title": "Where to Find the Best Party Supplies",
    "content": [
      "Review of popular online retailers for party supplies",
      "Considerations when shopping: price, variety, customer reviews"
    ],
    "type": "section",
    "section": 5
  },
  {
    "title": "Conclusion",
    "content": [
      "Recap of the importance of choosing the best party supplies",
      "Encouragement for the reader to consider these tips when planning their next event"
    ],
    "type": "conclusion",
    "section": 6
  }
]
`,
      },
      {
        role: "user",
        content: `
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

    const outline = JSON.parse(response.data);

    if (!outline) {
      return {
        data: null,
        success: false,
        error: "No outline generated",
      };
    }

    return {
      data: outline,
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
