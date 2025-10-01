import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { createSet } from "../api/routines";
import { getActivities } from "../api/activities";

export default function RoutineDetails({ routine, syncRoutines }) {
  const { token } = useAuth();
  const [activities, setActivities] = useState([]);
  const [activityId, setActivityId] = useState("");
  const [count, setCount] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const data = await getActivities();
        setActivities(data);
        if (data.length > 0) setActivityId(data[0].id);
      } catch (e) {
        console.error(e);
      }
    }
    fetchActivities();
  }, []);

  const handleAddSet = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await createSet(token, routine.id, { activityId, count: Number(count) });
      setCount(""); // reset reps field
      syncRoutines(); // refresh routine with new set
    } catch (e) {
      setError(e.message);
    }
  };

  if (!token) return null;

  return (
    <div>
      <h3>Add a new set</h3>
      <form onSubmit={handleAddSet}>
        <label>
          Activity:
          <select value={activityId} onChange={(e) => setActivityId(e.target.value)}>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Reps:
          <input
            type="number"
            min="1"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Set</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
