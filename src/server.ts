import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = 5000;

const prisma = new PrismaClient();

app.use(express.json());
app.get("/", (req, res) => {
  console.log("get");
  return [];
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
