import React, { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import ExerciseItemComponent from "./ExerciseItemComponent";

const ExerciseComponent = () => {
  const inputRef = useRef();
  const [item, setItem] = useState("");
  const [exerciseItems, setExerciseItems] = useState([]);
  const [errors, setErrors] = useState("");

  const handleAddItem = () => {
    if (item) {
      setExerciseItems([...exerciseItems, { id: uuid(), name: item }]);
      setItem("");
      setErrors("");
    } else {
      setErrors("Error: Empty fields.");
      inputRef.current.focus();
    }
  };

  const handleEditItem = (id, newItem) => {
    const updatedExerciseItems = exerciseItems.map((item) => {
      if (item.id === id) {
        return { ...item, name: newItem };
      }

      return item;
    });
    setExerciseItems(updatedExerciseItems);
  };

  const handleDeleteItem = (removeId) => {
    const filteredItems = exerciseItems.filter((item) => item.id !== removeId);
    setExerciseItems(filteredItems);
  };

  const handleClearItems = () => {
    setExerciseItems([]);
  };

  return (
    <div className="workout-list">
      <h1>Workout List</h1>
      <div className="input-section">
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            value={item}
            onChange={(event) => setItem(event.target.value)}
          />
          <button onClick={handleAddItem} className="btn-add">
            Add Exercise
          </button>
        </div>
        <div>{errors ? <p className="errors">{errors}</p> : null}</div>
      </div>
      <ul className="exercise-list">
        {exerciseItems.map((item) => (
          <ExerciseItemComponent
            key={item.id}
            item={item}
            handleEditItem={handleEditItem}
            handleDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
      {exerciseItems.length > 0 ? (
        <button onClick={handleClearItems} className="btn-clear">
          Clear List{" "}
        </button>
      ) : null}
    </div>
  );
};

export default ExerciseComponent;