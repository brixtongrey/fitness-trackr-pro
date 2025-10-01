const API = import.meta.env.VITE_API;

/** Fetch all routines from the API */
export async function getRoutines() {
  try {
    const response = await fetch(`${API}/routines`);
    if (!response.ok) {
      throw Error("Failed to fetch routines");
    }
    return await response.json();
  } catch (e) {
    console.error("Error fetching routines:", e);
    return [];
  }
}


export async function getRoutineById(routineId) {
  const res = await fetch(`${API}/routines/${routineId}`);
  if (!res.ok) throw new Error("Failed to fetch routine details");
  return res.json();
}

/** Create a new routine (requires token) */
export async function createRoutine(token, routine) {
  const response = await fetch(`${API}/routines`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(routine),
  });

  const result = await response.json();
  if (!response.ok) {
    throw Error(result.message || "Failed to create routine");
  }
  return result;
}

/** Delete a routine (requires token) */
export async function deleteRoutine(token, id) {
  const response = await fetch(`${API}/routines/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message || "Failed to delete routine");
  }
}

// --- NEW: Sets management ---

// Add a set to a routine
export async function createSet(token, routineId, { activityId, count }) {
  const response = await fetch(`${API}/routine_activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ routineId, activityId, count }), // API expects "count" instead of "reps"
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message || "Failed to add set");
  }

  return response.json();
}

// Delete a set from a routine
export async function deleteSet(token, setId) {
  const response = await fetch(`${API}/routine_activities/${setId}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });
  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
  return true; // just return true if successful
}
