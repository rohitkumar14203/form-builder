import mongoose from "mongoose";

const inputSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["text", "email", "password", "number", "date"],
    required: true,
  },
  label: { type: String, required: true },
  placeholder: { type: String },
});

const formSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    inputs: [inputSchema],
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);
export default Form;
