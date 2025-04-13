import React, { useState } from "react";
import { saveSeed, loadSeed } from "../api/seedApi";

const SeedManager = () => {
  const [seed, setSeed] = useState("");
  const [seedId, setSeedId] = useState("");
  const [savedSeedId, setSavedSeedId] = useState(null);
  const [status, setStatus] = useState("");

  const handleSave = async () => {
    try {
      const response = await saveSeed(seed);
      setSavedSeedId(response.id);
      setStatus("Seed saved!");
    } catch (err) {
      setStatus("Error saving seed");
      console.error(err);
    }
  };

  const handleLoad = async () => {
    try {
      const data = await loadSeed(seedId);
      setSeed(data.seed || "");
      setStatus("Seed loaded!");
    } catch (err) {
      setStatus("Error loading seed");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Seed Manager</h2>

      <div>
        <label>
          Seed:{" "}
          <input
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder="Enter seed"
          />
        </label>
        <button onClick={handleSave}>Save Seed</button>
      </div>

      {savedSeedId && (
        <p>
          Saved with ID: <code>{savedSeedId}</code>
        </p>
      )}

      <div style={{ marginTop: "1rem" }}>
        <label>
          Load by ID:{" "}
          <input
            value={seedId}
            onChange={(e) => setSeedId(e.target.value)}
            placeholder="Enter seed ID"
          />
        </label>
        <button onClick={handleLoad}>Load Seed</button>
      </div>

      <p>{status}</p>
      <p>Current Seed: <code>{seed}</code></p>
    </div>
  );
};

export default SeedManager;
