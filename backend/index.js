import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import formRoutes from "./routes/formRoutes.js";

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(
  cors({
    origin: [
      "https://form-builder-rho-six.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

app.use(express.json());

app.use("/api/form", formRoutes);

app.get("/", (req, res) => {
  res.send("api is running...");
});

app.listen(PORT, () => {
  console.log(`server is up  ${PORT}`);
});
