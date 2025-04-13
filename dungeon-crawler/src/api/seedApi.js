const API_BASE = "http://localhost:3001/api";

export async function saveSeed(seed) {
  const response = await fetch(`${API_BASE}/seed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ seed: seed }),
  });

  if (!response.ok) {
    throw new Error("Failed to save seed");
  }

  return await response.json();
}

export async function loadSeed(id) {
  const response = await fetch(`${API_BASE}/seed/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch seed");
  }

  return await response.json();
}
