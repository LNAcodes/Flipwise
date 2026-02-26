// pages/api/flashcards/[id].js

import dbConnect from "@/db/connect";
import Flashcard from "@/db/models/Flashcard";

export default async function handler(request, result) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const flashcard = await Flashcard.findById(id);
      if (!flashcard) return result.status(404).json({ message: "Not found" });
      return result.status(200).json(flashcard);
    } catch (error) {
      return result.status(500).json({ error: error.message });
    }
  }

  if (["PATCH", "PUT"].includes(request.method)) {
    try {
      const updated = await Flashcard.findByIdAndUpdate(id, request.body, {
        new: true,
        runValidators: true,
      });

      if (!updated) return result.status(404).json({ message: "Not found" });

      return result.status(200).json(updated);
    } catch (error) {
      return result.status(500).json({ error: error.message });
    }
  }

  return result.status(405).json({ message: "Method not allowed" });
}
