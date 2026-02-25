// pages\api\flashcards\index.js

import dbConnect from "@/db/connect";
import Flashcard from "@/db/models/Flashcard";

export default async function handler(request, response) {
  await dbConnect();
  switch (request.method) {
    case "GET":
      try {
        const flashcards = await Flashcard.find().sort({ createdAt: -1 });
        return response.status(200).json(flashcards);
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }
    case "POST":
      const flashcardData = request.body;
      try {
        const flashcard = await Flashcard.create(flashcardData);
        return response.status(201).json(flashcard);
      } catch (error) {
        console.error(error);
        // @Team: Ich habe den Key von 'error' auf 'message' vereinheitlicht.
        // Grund: Damit unsere API-Antworten konsistent sind (wie beim 405-Fehler)
        // und die Tests einheitlich gegen 'response.body.message' prüfen können.
        // Bitte in euren neuen Cases auch 'message: error.message' nutzen.
        return response.status(500).json({ message: error.message });
      }

    default:
      return response.status(405).json({ message: "Method not allowed" });
  }
}
