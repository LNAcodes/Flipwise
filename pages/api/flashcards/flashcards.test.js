// pages/api/flashcards/flashcards.test.js

// 1. ZUERST die Mocks (Wichtig: Vor den Imports!)
jest.mock("@/db/connect", () => jest.fn());

jest.mock("@/db/models/Flashcard", () => {
  return {
    __esModule: true,
    default: {
      find: jest.fn(),
    },
  };
});

// 2. DANN die Imports
import handler from "./index";
import Flashcard from "@/db/models/Flashcard";
import {
  createMockReq,
  createMockRes,
} from "../../../utils/test-utils/mock-factory";
console.log("Was ist createMockReq?", createMockReq);

describe("API Route: /api/flashcards", () => {
  test("returns 200 and all flashcards for GET request", async () => {
    // Fake-Daten definieren
    const mockData = [
      { _id: "1", question: "What is React?", answer: "A library" },
    ];

    // Den Mock-Wert für find() setzen
    Flashcard.find.mockResolvedValue(mockData);

    // Mock Request und Response erstellen
    const req = createMockReq({ method: "GET" });
    const res = createMockRes();

    // Den Handler ausführen
    await handler(req, res);

    // Prüfen, ob Status 200 und die richtigen Daten zurückkamen
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  test("returns 405 for non-GET requests", async () => {
    const req = createMockReq({ method: "POST" });
    const res = createMockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ message: "Method not allowed" });
  });
});
