import express from "express";
import {
  createForm,
  getAllForms,
  getFormById,
  updateForm,
  deleteForm,
} from "../controllers/formController.js";

const router = express.Router();

router.get("/", getAllForms);
router.post("/create", createForm);
router.put("/:id/edit", updateForm);

router.route("/:id").get(getFormById).delete(deleteForm);

export default router;
