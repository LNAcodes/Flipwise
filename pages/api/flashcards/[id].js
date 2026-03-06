// pages/api/flashcards/[id].js

import dbConnect from "@/db/connect";
import Flashcard from "@/db/models/Flashcard";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getToken } from "next-auth/jwt";

export default async function handler(request, result) {
  await dbConnect();

  const { id } = request.query;
  const session = await getServerSession(request, response, authOptions);
  const token = await getToken({ req: request });
  const userId = token?.sub;

  if (request.method === "GET") {
    try {
      if (!session) {
      }
      return response.status(401).json;
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
  if (request.method === "DELETE") {
    try {
      const deletedFlashCard = await Flashcard.findByIdAndDelete(id);
      if (!deletedFlashCard) {
        return result.status(404).json({ error: "Flashcard not found" });
      }
      return result.status(200).json({ success: true });
    } catch (error) {
      return result.status(500).json({ error: error.message });
    }
  }
  return result.status(405).json({ message: "Method not allowed" });
}
