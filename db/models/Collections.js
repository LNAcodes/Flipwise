import mongoose from "mongoose";

const { Schema } = mongoose;

const collectionsSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
});

const Collections =
  mongoose.models.Collections ||
  mongoose.model("Collections", collectionsSchema);

export default Collections;
