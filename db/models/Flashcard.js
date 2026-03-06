// db\models\Flashcards.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const flashcardsSchema = new Schema(
  {
    collection: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);
flashcardsSchema.index({ userId: 1 });

const Flashcard =
  mongoose.models.Flashcard || mongoose.model("Flashcard", flashcardsSchema);

export default Flashcard;
