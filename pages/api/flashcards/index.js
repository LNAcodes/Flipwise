import dbConnect from "@/db/connect";
import Flashcards from "@/db/models/Flashcards";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const flashcards = await Flashcards.find();
    return response.status(200).json(flashcards);
  }
}
