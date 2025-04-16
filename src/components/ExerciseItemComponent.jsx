import React, { useState } from "react";

/*
  main list component, handles input of exercises, editing and deleting items, searching, validation/ui
*/ 

const ExerciseItemComponent = ({ item, handleEditItem, handleDeleteItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [sets, setSets] = useState(item.sets || 3);
  const [reps, setReps] = useState(item.reps || 10);
  const [errors, setErrors] = useState("");
  const [showImages, setShowImages] = useState(false); // NEW

  const formatPrimaryMuscles = (muscles) => {
    if (!muscles) return '';
    // Remove brackets and quotes, and split into array
    const cleanMuscles = muscles.replace(/[\[\]"]/g, '');
    // Split by comma and trim each muscle
    return cleanMuscles.split(',').map(muscle => muscle.trim()).join(', ');
  };

  const onEdit = () => {
    if (sets > 0 && reps > 0) {
      handleEditItem(item.id, { ...item, sets: parseInt(sets), reps: parseInt(reps) });
      setIsEditing(false);
      setErrors("");
    } else {
      setErrors("Sets and reps must be greater than 0.");
    }
  };

  const imagesArray = item.images ? JSON.parse(item.images) : [];

  return (
    <>
      <li className="exercise-item">
        <div className="exercise-info">
          <h3>{item.name}</h3>
          <p>Equipment: {item.equipment}</p>
          <p>Primary Muscles: {formatPrimaryMuscles(item.primaryMuscles)}</p>
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
          <button
            onClick={() => setShowImages(!showImages)}
            className="btn-toggle-images"
          >
            {showImages ? "Hide Images" : "Show Images"}
          </button>

          {showImages && (
            <div className="exercise-images">
              {imagesArray.map((image, index) => (
                <img
                  key={index}
                  src={`/exercise-app/assets/${image}`}
                  className="exercise-thumbnail"
                  alt={`exercise-thumbnail-${index}`}
                />
              ))}
            </div>
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