import { Request, Response } from "express";
import { createNote, createSummaryFromUrl } from "../../utils/summarizer";
import { generateSummary } from "../../api/ai/summarizer";

export async function summarizeUrl(req: Request, res: Response) {
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({
      data: null,
      success: false,
      error: "No url provided",
    });
  }

  const [note, summary] = await Promise.all([
    createNote(url),
    createSummaryFromUrl(url),
  ]);

  if (!note.success) {
    return res.status(400).json({
      data: null,
      success: false,
      error: note.error,
    });
  }

  if (summary.success === false) {
    return res.status(400).json({
      data: null,
      success: false,
      error: summary.error,
    });
  }

  return res.status(200).json({
    data: {
      notes: note.data.notes,
      summary: summary.data.summary,
      title: note.data.title || summary.data.title,
      url: note.data.url || summary.data.url,
    },
    success: true,
    error: null,
  });
}

export async function summarizeText(req: Request, res: Response) {
  const text = req.body.text;
  const gptSettings = req.body.settings || null;

  if (!text) {
    return res.status(400).json({
      data: null,
      success: false,
      error: "No text provided",
    });
  }

  const summary = await generateSummary({ text }, gptSettings);

  if (summary.success === false) {
    return res.status(400).json({
      data: null,
      success: false,
      error: summary.error,
    });
  }

  return res.status(200).json({
    data: { summary: summary.data },
    success: true,
    error: null,
  });
}
