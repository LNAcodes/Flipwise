// pages/api/flashcards/[id].js

import dbConnect from "@/db/connect";
import Flashcard from "@/db/models/Flashcard";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const flashcard = await Flashcard.findById(id);
      if (!flashcard) return res.status(404).json({ message: "Not found" });
      return res.status(200).json(flashcard);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PATCH" || req.method === "PUT") {
    try {
      const updated = await Flashcard.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updated) return res.status(404).json({ message: "Not found" });

      return res.status(200).json(updated);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
