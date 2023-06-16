import { Request, Response } from "express";
import { searchBing } from "../../utils/bing_search";

export async function search(req: Request, res: Response) {
  const query = req.body.query;
  const count = req.body.count || 10;

  if (!query) {
    res.status(400).json({
      data: null,
      success: false,
      error: "No query provided",
    });
  }

  const results = await searchBing(query, count);

  if (!results.success) {
    return res.status(400).json({
      data: null,
      success: false,
      error: results.error,
    });
  }

  return res.status(200).json({
    data: { results: results.data },
    success: true,
    error: null,
  });
}
