import React from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { deleteActivity } from "../api/activities";

function ActivityDetails() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const { activities, token, syncActivities } = useOutletContext();

  const activity = activities.find((a) => activityId === String(a.id));

  if (!activity) return <p>Loading activity...</p>;

  const handleDelete = async () => {
    try {
      await deleteActivity(token, activity.id);

      syncActivities();

      navigate("/activities");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{activity.name}</h2>
      <p>{activity.description}</p>
      <p>Created by: {activity.creatorName}</p>
      {token && (
        <div className="row">
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default ActivityDetails;

