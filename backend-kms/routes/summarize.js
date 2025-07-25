const express = require("express");
const router = express.Router();
const { execFile } = require("child_process");

router.post("/", (req, res) => {
  const text = req.body.text;

  const python = execFile("python", ["summarize.py"], { cwd: __dirname + "/.." });

  let output = "";
  python.stdout.on("data", (data) => (output += data));

  python.stderr.on("data", (err) => console.error("Python error:", err.toString()));

  python.on("close", (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: "Summarization failed" });
    }

    try {
      const result = JSON.parse(output);
      res.json({ summary: result.summary });
    } catch (err) {
      res.status(500).json({ error: "Invalid response from summarizer" });
    }
  });

  python.stdin.write(JSON.stringify({ text }));
  python.stdin.end();
});

module.exports = router;