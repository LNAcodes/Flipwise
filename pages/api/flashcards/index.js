// pages\api\flashcards\index.js

import dbConnect from "@/db/connect";
import Flashcard from "@/db/models/Flashcard";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const flashcards = await Flashcard.find();
      return response.status(200).json(flashcards);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  if (request.method === "POST") {
    const flashcardData = request.body;

    try {
      const flashcard = await Flashcard.create(flashcardData);
      return response.status(201).json(flashcard);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  return response.status(405).json({ message: "Method not allowed" });
}
