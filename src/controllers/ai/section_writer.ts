import { Request, Response } from "express";
import { generateArticleSection } from "../../api/ai/writer";
import { generateSummary } from "../../api/ai/summarizer";
import { shortenNotes } from "../../api/ai/summarizer";

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

export async function createArticleSections(req: Request, res: Response) {
  const {
    keywords,
    outline,
    details,
    notes,
    formattingStyle,
    section,
    tone,
    summary,
  } = req.body;
  let shortNotes: string;

  if (notes) {
    console.log(notes);

    console.log(JSON.stringify(notes));
    const shorterNotes = await shortenNotes(JSON.stringify(notes));
    console.log("shorter notes pre", shorterNotes);

    if (shorterNotes.success) {
      console.log("shorter notes", shorterNotes.data);
      shortNotes = shorterNotes.data;
    } else {
      shortNotes = notes;
    }
  }

  const response = await generateArticleSection({
    keywords,
    outline,
    details,
    notes: shortNotes,
    formattingStyle,
    section,
    tone,
    summary,
  } as ArticleQuery);

  if (!response.success) {
    return res.status(400).json({
      error: response.error,
    });
  }

  const newSection = response.data;

  const newSummary = await generateSummary({
    text: newSection,
    prevSummary: summary || null,
  });

  if (!newSummary.success) {
    return res.status(200).json({
      data: {
        section: newSection,
        summary: null,
      },
      success: true,
      error: newSummary.error,
    });
  }

  return res.status(200).json({
    data: {
      section: newSection,
      summary: newSummary.data,
    },
    success: true,
    error: null,
  });
}
