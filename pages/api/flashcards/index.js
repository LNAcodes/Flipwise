// pages\api\flashcards\index.js

import dbConnect from "@/db/connect";
import Flashcard from "@/db/models/Flashcard";

export default async function handler(request, response) {
  await dbConnect();
  switch (request.method) {
    case "GET":
      try {
        const flashcards = await Flashcard.find();
        return response.status(200).json(flashcards);
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }
    case "POST":
    // @Elena oder Karsten: hier kommt eure POST Logik rein
    default:
      return response.status(405).json({ message: "Method not allowed" });
  }
}
