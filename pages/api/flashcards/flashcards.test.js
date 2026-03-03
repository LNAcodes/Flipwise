// pages/api/flashcards/flashcards.test.js

// 1. ZUERST die Mocks (Wichtig: Vor den Imports!)
jest.mock("@/db/connect", () => jest.fn());

jest.mock("@/db/models/Flashcard", () => {
  return {
    __esModule: true,
    default: {
      find: jest.fn(),
      create: jest.fn(),
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

describe("API Route: /api/flashcards", () => {
  test("returns 200 and all flashcards for GET request", async () => {
    // Fake-Daten definieren
    const mockData = [
      { _id: "1", question: "What is React?", answer: "A library" },
    ];

    Flashcard.find.mockResolvedValue(mockData);

    // Mock Request und Response erstellen
    const req = createMockReq({ method: "GET" });
    const res = createMockRes();

    await handler(req, res);

    // Status 200 und richtige Datenantwort prüfen
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  test("returns 405 for (actual) unsupported methods (e.g. PUT)", async () => {
    const req = createMockReq({ method: "PUT" }); // da PUT noch nicht im Switch ist
    const res = createMockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ message: "Method not allowed" });
  });
  // Test für Elenas POST Merge
  test("returns 201 for valid POST request", async () => {
    const newCard = { question: "New?", answer: "Yes!" };
    Flashcard.create.mockResolvedValue({ _id: "123", ...newCard });

    const req = createMockReq({
      method: "POST",
      body: newCard,
    });
    const res = createMockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(newCard));
  });
});
describe("GET (api/flashcards - Error Handling", () => {
  it("should return 500 if the database throws an error", async () => {
    Flashcard.find.mockRejectedValue(new Error("Database Connection Failed"));
    const req = createMockReq({ method: "GET" });
    const res = createMockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Database Connection Failed",
    });
  });
});
