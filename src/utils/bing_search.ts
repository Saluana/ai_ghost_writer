import { SearchResponse, SearchResult } from "../types/bing";
import { ApiResponse } from "../types/rest";
import axios from "axios";

export async function searchBing(
  query: string,
  count: number = 10
): Promise<ApiResponse> {
  let result: SearchResponse = {
    data: null,
    error: null,
  };

  //make the request in axios
  const response = await axios
    .get(
      `https://api.bing.microsoft.com/v7.0/search?q=${query}&count=${count}`,
      {
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.BING_API_KEY,
        },
      }
    )
    .catch((err) => {
      console.log("Error from Bing Request", err);
      return {
        data: null,
        success: false,
        error: "Error from Bing Request",
      } as SearchResponse;
    });

  //parse the response
  const json = response.data;

  //validate response
  if (!json.webPages || !json.webPages.value) {
    console.log("Invalid response from Bing");
    return {
      data: null,
      success: false,
      error: "Invalid response from Bing",
    } as ApiResponse;
  }

  //return the top 5 results
  result.data = json.webPages.value.map((result: any) => ({
    title: result.name,
    url: result.url,
    description: result.snippet,
    query,
  })) as SearchResult[];

  return {
    data: result.data,
    success: true,
    error: null,
  };
}
