import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { createRoutine } from "../api/routines";

/** Form for a logged-in user to create a new routine */
export default function RoutineForm({ syncRoutines }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);

  const tryCreateRoutine = async (formData) => {
    setError(null);

    const name = formData.get("name");
    const goal = formData.get("goal");

    try {
      await createRoutine(token, { name, goal });
      syncRoutines(); // refresh the routines list
      form.reset(); // clear the form
    } catch (e) {
      setError(e.message);
    }
  };

  if (!token) return null; // only show the form if logged in

  return (
    <div>
      <h2>Create a New Routine</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          tryCreateRoutine(new FormData(e.target));
        }}
      >
        <label>
          Name
          <input type="text" name="name" required />
        </label>
        <label>
          Goal
          <input type="text" name="goal" required />
        </label>
        <button type="submit">Add Routine</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}

