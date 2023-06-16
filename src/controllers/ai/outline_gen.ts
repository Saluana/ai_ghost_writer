import { generateArticleOutline } from "../../api/ai/outliner";
import { Request, Response } from "express";

export async function generateOutline(req: Request, res: Response) {
  const query = req.body.query;
  const settings = req.body.settings || null;

  if (!query) {
    res.status(400).json({
      data: null,
      success: false,
      error: "No query provided",
    });
  }

  const outline = await generateArticleOutline({ query }, settings);

  if (!outline.success) {
    return res.status(400).json({
      data: null,
      success: false,
      error: outline.error,
    });
  }

  return res.status(200).json({
    data: { outline: outline.data },
    success: true,
    error: null,
  });
}
