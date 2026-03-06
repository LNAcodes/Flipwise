// pages/api/flashcards/[id].js

import dbConnect from "@/db/connect";
import Flashcard from "@/db/models/Flashcard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

export default async function handler(request, result) {
  await dbConnect();

  const { id } = request.query;
  const session = await getServerSession(request, result, authOptions);
  const token = await getToken({ req: request });
  const userId = token?.sub;

  if (!session) {
    return result.status(401).json({ message: "Unauthorized" });
  }

  if (request.method === "GET") {
    try {
      const flashcard = await Flashcard.findOne({
        _id: newObjectId(id),
        userId,
      });
      if (!flashcard || flashcard.userId !== userId)
        return result.status(404).json({ message: "Flashcard not found" });
      return result.status(200).json(flashcard);
    } catch (error) {
      return result.status(500).json({ error: error.message });
    }
  }

  if (["PATCH", "PUT"].includes(request.method)) {
    try {
      const flashcard = await Flashcard.ffindOne({
        _id: newObjectId(id),
        userId,
      });
      if (!flashcard || flashcard.userId !== userId) {
        return result.status(404).json({ message: "Flashcard not found" });
      }
      const updated = await Flashcard.findByIdAndUpdate(id, request.body, {
        new: true,
        runValidators: true,
      });
      return result.status(200).json(updated);
    } catch (error) {
      return result.status(500).json({ error: error.message });
    }
  }
  if (request.method === "DELETE") {
    try {
      const flashcard = await Flashcard.findOne({
        _id: newObjectId(id),
        userId,
      });
      if (!flashcard || flashcard.userId !== userId) {
        return result.status(404).json({ message: "Flashcard not found" });
      }
      await Flashcard.findByIdAndDelete({ _id: new ObjectId(id), userId });
      return result.status(200).json({ success: true });
    } catch (error) {
      return result.status(500).json({ error: error.message });
    }
  }
  return result.status(405).json({ message: "Method not allowed" });
}
