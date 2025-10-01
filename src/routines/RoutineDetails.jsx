import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { deleteRoutine, createSet, deleteSet } from "../api/routines";
import { getActivities } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

function RoutineDetails() {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const { routines, syncRoutines } = useOutletContext();
  const { token } = useAuth();

  const routine = routines.find((r) => String(r.id) === routineId);

  const [activities, setActivities] = useState([]);
  const [activityId, setActivityId] = useState("");
  const [count, setCount] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const data = await getActivities();
        console.log("Activities fetched:", data);
        setActivities(data);
        if (data.length > 0) setActivityId(data[0].id);
      } catch (e) {
        console.error("Error fetching activities:", e);
      }
    }
    fetchActivities();
  }, []);

  if (!routine) return <p>Loading routine...</p>;

  const handleDeleteRoutine = async () => {
    try {
      await deleteRoutine(token, routine.id);
      syncRoutines();
      navigate("/routines");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSet = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await createSet(token, routine.id, {
        activityId: Number(activityId),
        count: Number(count),
      });
      setCount("");
      syncRoutines();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleDeleteSet = async (setId) => {
    try {
      await deleteSet(token, setId);
      syncRoutines();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{routine.name}</h2>
      <p>Goal: {routine.goal}</p>
      <p>Created by: {routine.creatorName}</p>

      <h3>Sets</h3>
      {routine.sets?.length ? (
        <ul>
          {routine.sets.map((set) => (
            <li key={set.id}>
              {set.activityName} – {set.count} reps
              {token && (
                <button onClick={() => handleDeleteSet(set.id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No sets yet. Add one below!</p>
      )}


      {token && (
        <>
          <h3>Add a new set</h3>
          <form onSubmit={handleAddSet}>
                {console.log("Rendering dropdown with activities:", activities)}
            <label>
              Activity:
              <select
                value={activityId || ""}
                onChange={(e) => setActivityId(e.target.value)}
                required
              >
                <option value="" disabled>
                  -- Select an activity --
                </option>
                {activities.map((activity) => (
                  <option key={activity.id} value={String(activity.id)}>
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

            <button type="submit" disabled={!activityId}>
              Add Set
            </button>
          </form>
          {error && <p role="alert">{error}</p>}
        </>
      )}

      {token && (
        <div className="row">
          <button onClick={handleDeleteRoutine}>Delete Routine</button>
        </div>
      )}
    </div>
  );
}

export default RoutineDetails;
