import Form from "../model/formModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const createForm = asyncHandler(async (req, res) => {
  const { title, inputs } = req.body;

  if (!title || !inputs || inputs.length === 0) {
    res.status(400);
    throw new Error("Title and inputs are required");
  }

  const newForm = new Form({ title, inputs });
  await newForm.save();
  res
    .status(201)
    .json({
      success: true,
      message: "Form created successfully",
      form: newForm,
    });
});

const getAllForms = asyncHandler(async (req, res) => {
  const forms = await Form.find({}, "title");
  res.status(200).json(forms);
});

const getFormById = asyncHandler(async (req, res) => {
  const form = await Form.findById(req.params.id);
  if (!form) {
    res.status(404);
    throw new Error("Form not found");
  }
  res.status(200).json(form);
});

const updateForm = asyncHandler(async (req, res) => {
  const { title, inputs } = req.body;
  const updatedForm = await Form.findByIdAndUpdate(
    req.params.id,
    { title, inputs },
    { new: true }
  );
  if (!updatedForm) {
    res.status(404);
    throw new Error("Form not found");
  }
  res.status(200).json(updatedForm);
});

const deleteForm = asyncHandler(async (req, res) => {
  const form = await Form.findById(req.params.id);
  if (!form) {
    res.status(404);
    throw new Error("Form not found");
  }

  await form.deleteOne();

  res.status(200).json({ success: true, message: "Form deleted successfully" });
});

export { createForm, getAllForms, getFormById, updateForm, deleteForm };
