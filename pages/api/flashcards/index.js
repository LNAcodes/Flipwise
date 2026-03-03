// pages/api/flashcards/index.js

import dbConnect from "@/db/connect";
import Flashcard from "@/db/models/Flashcard";

export default async function handler(request, response) {
  await dbConnect();

  switch (request.method) {
    case "GET": {
      try {
        const flashcards = await Flashcard.find().sort({ createdAt: -1 });
        return response.status(200).json(flashcards);
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }
    }

    case "POST": {
      try {
        const flashcard = await Flashcard.create(request.body);
        return response.status(201).json(flashcard);
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }
    }

    default:
      return response.status(405).json({ message: "Method not allowed" });
  }
}
