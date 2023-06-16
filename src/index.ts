import express from "express";
import "dotenv/config";
import cors from "cors";

const port = process.env.PORT || 8081;
const app = express();

app.use(express.json());
app.use(cors());

import aiRoutes from "./routes/ai";
import searchRoutes from "./routes/search";
import summaryRoutes from "./routes/summarize";

app.use("/api/ai", aiRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/summarize", summaryRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
