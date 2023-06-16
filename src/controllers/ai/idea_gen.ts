import { generateArticleIdeas } from "../../api/ai/idea_generator";
import { Request, Response } from "express";
import { splitNotes } from "../../utils/notes";

export async function generateIdeas(req: Request, res: Response) {
  const query = req.body.query;
  const amount = req.body.amount || 10;
  const settings = req.body.settings || null;

  if (!query) {
    res.status(400).json({
      data: null,
      success: false,
      error: "No query provided",
    });
  }

  const ideas = await generateArticleIdeas({ query, amount }, settings);

  if (!ideas.success) {
    return res.status(400).json({
      data: null,
      success: false,
      error: ideas.error,
    });
  }

  const noteList = splitNotes(ideas.data);

  console.log(noteList);

  return res.status(200).json({
    data: { notes: noteList },
    success: true,
    error: null,
  });
}
