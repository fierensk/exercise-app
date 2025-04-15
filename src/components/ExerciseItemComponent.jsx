import React, { useState } from "react";

/*
  main list component, handles input of exercises, editing and deleting items, searching, validation/ui
*/ 

const ExerciseItemComponent = ({ item, handleEditItem, handleDeleteItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [sets, setSets] = useState(item.sets || 3);
  const [reps, setReps] = useState(item.reps || 10);
  const [errors, setErrors] = useState("");

  const onEdit = () => {
    if (sets > 0 && reps > 0) {
      handleEditItem(item.id, { ...item, sets: parseInt(sets), reps: parseInt(reps) });
      setIsEditing(false);
      setErrors("");
    } else {
      setErrors("Sets and reps must be greater than 0.");
    }
  };

  return (
    <>
      <li className="exercise-item">
        <div className="exercise-info">
          <h3>{item.name}</h3>
          <p>Equipment: {item.equipment}</p>
          <p>Primary Muscles: {item.primaryMuscles}</p>
          {isEditing ? (
            <div className="sets-reps-input">
              <div>
                <label>Sets:</label>
                <input
                  type="number"
                  min="1"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                />
              </div>
              <div>
                <label>Reps:</label>
                <input
                  type="number"
                  min="1"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <p>Sets: {sets} | Reps: {reps}</p>
          )}
        </div>

        <div className="exercise-actions">
          <button
            onClick={() => {
              isEditing ? onEdit() : setIsEditing(true);
            }}
            className="btn-edit"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button
            onClick={() => handleDeleteItem(item.id)}
            className="btn-delete"
          >
            Delete
          </button>
        </div>
      </li>
      {errors ? <p className="errors">{errors}</p> : null}
    </>
  );
};

export default ExerciseItemComponent;