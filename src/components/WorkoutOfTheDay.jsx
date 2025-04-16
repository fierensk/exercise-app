import React, { useEffect, useState } from "react";

const WorkoutOfTheDayComponent = () => {
  const [dailyWorkout, setDailyWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await fetch("/api/daily"); // You can also fetch from `/api?random=true` or mock this
        const data = await res.json();
        setDailyWorkout(data.data); // assuming `data.data` is a single workout object
      } catch (err) {
        console.error("Failed to fetch workout of the day:", err);
      }
    };

    fetchWorkout();
  }, []);

  if (!dailyWorkout) return null;

  return (
    <div className="daily-workout">
      <h2>🏋️ Workout of the Day</h2>
      <h3>{dailyWorkout.name}</h3>
      <p>Primary Muscles: {dailyWorkout.primaryMuscles.replace(/[\[\]"]/g, "")}</p>
      <img src={dailyWorkout.gifUrl} alt={dailyWorkout.name} className="workout-gif" />
    </div>
  );
};

export default WorkoutOfTheDayComponent;
