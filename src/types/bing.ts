export interface SearchResult {
  url: string;
  description: string;
  query: string;
}

export interface SearchSummaryResponse {
  data: {
    response: string | null;
    notes: string[];
    summaries: string[];
    urls: string[];
    descriptions: string[];
    query: string;
  } | null;
  error: string | null;
}

export interface SearchResponse {
  data: SearchResult[] | null;
  error: string | null;
}
