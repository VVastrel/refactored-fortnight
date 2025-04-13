const express = require("express");
const cors = require("cors");
const db = require("./db");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Save seed with provided or generated UUID
app.post("/api/seed", (req, res) => {
  const { seed, id } = req.body;
  const uuid = id || uuidv4(); // Use provided ID or generate one

  db.run(
    "INSERT INTO map_seeds (id, seed) VALUES (?, ?)",
    [uuid, seed],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: uuid, seed });
    },
  );
});

// Get seed by UUID
app.get("/api/seed/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM map_seeds WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Seed not found" });
    res.json(row);
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
