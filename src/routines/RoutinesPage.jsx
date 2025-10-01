import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router";
import { getRoutines } from "../api/routines";
import RoutineForm from "./RoutineForm";

/** Page showing all routines and a form to create a new one */
export default function RoutinesPage() {
  const [routines, setRoutines] = useState([]);

  // Fetch routines from the API
  const syncRoutines = async () => {
    const data = await getRoutines();
    setRoutines(data);
  };

  useEffect(() => {
    syncRoutines();
  }, []);

  return (
    <div>
      <h1>Routines</h1>

      <RoutineForm syncRoutines={syncRoutines} />

      {routines.length > 0 ? (
        <ul>
          {routines.map((routine) => (
            <li key={routine.id}>
              <Link to={`/routines/${routine.id}`}>{routine.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No routines found.</p>
      )}

      {/* Pass routines and sync function to child routes (RoutineDetails) */}
      <Outlet context={{ routines, syncRoutines }} />
    </div>
  );
}


