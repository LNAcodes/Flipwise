import mongoose from "mongoose";

const { Schema } = mongoose;

const collectionsSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
});

const Collection =
  mongoose.models.Collection || mongoose.model("Collection", collectionsSchema);

export default Collection;
