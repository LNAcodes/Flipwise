// pages/api/flashcards/flashcards.test.js
import handler from "./index";
import Flashcard from "@/db/models/Flashcard";
import { createMockReq, createMockRes } from "@/utils/test-utils/test-utils";

// mocken der Flashcards als Kopie und der Verbindung
jest.mock("@/db/models/Flashcard");
jest.mock("@/db/connect", () => jest.fn());

describe("API Route: /api/flashcards", () => {
  test("returns 200 and all flashcards for GET request", async () => {
    const mockData = [
      { _id: "1", question: "What is React?", answer: "A library" },
    ];
    Flashcard.find.mockResolvedValue(mockData);

    const req = createMockReq({ method: "GET" });
    const res = createMockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });
});
