const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { containsHumanFace } = require("./visionCheck");

const upload = multer({ dest: "uploads/" });
const app = express();

app.post("/upload", upload.single("photo"), async (req, res) => {
  const filePath = req.file.path;
  try {
    const hasFace = await containsHumanFace(filePath);
    if (hasFace) {
      fs.unlinkSync(filePath); // delete file if invalid
      return res.status(400).json({ error: "Human faces are not allowed in uploads." });
    }
    res.json({ success: true, message: "Upload accepted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Vision API error." });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
