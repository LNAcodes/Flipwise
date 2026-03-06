// pages/api/flashcards/index.js

import dbConnect from "@/db/connect";
import Flashcard from "@/db/models/Flashcard";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  await dbConnect();

  const session = await getServerSession(request, response, authOptions);
  const token = await getToken({ req: request });
  const userId = token?.sub;

  switch (request.method) {
    case "GET": {
      try {
        const user = session ? userId : "default";
        const flashcards = await Flashcard.find({ userId: user }).sort({
          createdAt: -1,
        });
        return response.status(200).json(flashcards);
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }
    }

    case "POST": {
      try {
        if (!session) {
          return response.status(401).json({ message: "Unauthorized" });
        }
        const flashcard = await Flashcard.create({ ...request.body, userId });
        return response.status(201).json(flashcard);
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }
    }

    default:
      return response.status(405).json({ message: "Method not allowed" });
  }
}
