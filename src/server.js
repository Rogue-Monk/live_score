import express from "express";
import { db } from "./db/db.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Live Score Server is running!",
    status: "online",
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint for DB
app.get("/health", async (req, res) => {
  try {
    // A simple query to check DB connectivity
    await db.execute("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    res
      .status(500)
      .json({
        status: "error",
        database: "disconnected",
        message: error.message,
      });
  }
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
