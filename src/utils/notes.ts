export function splitNotes(notes: string): string[] {
  if (!notes || notes.length < 1) return [];

  const notesArray = notes
    .split("->")
    .map((notes) => notes.trim())
    .filter((notes) => notes !== "");

  return notesArray;
}
