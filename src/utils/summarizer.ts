import axios from "axios";
import { ApiResponse } from "../types/rest";

type ScrapedData = {
  status: "success" | "failure";
  notes?: string[];
  summary?: string;
  title?: string;
  url?: string;
  message: string;
};

const serverUrl = process.env.ARTICLE_SCRAPER_URL;
const key = process.env.OPENAI_API_KEY;

const createNote = async (url: string): Promise<ApiResponse> => {
  if (!url || typeof url != "string")
    return { data: null, success: false, error: "URL is required" };

  try {
    const response = await axios.post(
      serverUrl + "/notes",
      { URL: url.trim() },
      { headers: { "OAI-KEY": key } }
    );

    if (response.data.status === "failure") {
      return {
        data: null,
        success: false,
        error: response.data.message,
      };
    }

    return {
      success: true,
      data: response.data as ScrapedData,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      error: error.message || "Error creating note",
    };
  }
};

const createSummaryFromUrl = async (url: string): Promise<ApiResponse> => {
  if (!url || typeof url != "string")
    return { data: null, success: false, error: "URL is required" };

  try {
    const response = await axios.post(
      serverUrl + "/summary",
      { URL: url.trim() },
      { headers: { "OAI-KEY": key } }
    );

    if (response.data.status === "failure") {
      return {
        success: false,
        data: null,
        error: response.data.message,
      };
    }

    return {
      success: true,
      data: response.data as ScrapedData,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      error: error.message || "Error creating summary",
    };
  }
};

export { createNote, createSummaryFromUrl };
