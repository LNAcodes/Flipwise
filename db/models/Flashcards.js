import mongoose from "mongoose";

const { Schema } = mongoose;

const flashcardsSchema = new Schema({
  collection: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const Flashcards =
  mongoose.models.Flashcards || mongoose.model("Flashcards", flashcardsSchema);

export default Flashcards;
