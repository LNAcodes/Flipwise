import dbConnect from "@/db/connect";
import Flashcards from "@/db/models/Flashcards";

export default async function handler(request, response) {
  await dbConnect();

    if (request.method === "GET") {
        try {
            const flashcards = await Flashcards.find();
            return response.status(200).json(flashcards);
        } catch(error){
            return response.status(500).json({ error: error.message });
        }
    } else {
        return response.status(405).json({ message: "Method not allowed" });
    }
}
