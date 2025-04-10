import React, { useRef, useState, useEffect } from "react";
import ExerciseItemComponent from "./ExerciseItemComponent";

const ExerciseComponent = () => {
  const inputRef = useRef();
  const [exerciseItems, setExerciseItems] = useState([]); // Selected task list
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Dropdown results
  const [errors, setErrors] = useState("");

  // Fetch matching exercises from DB
  useEffect(() => {
    const fetchExercises = async () => {
      if (!searchTerm) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await fetch(`/api?search=${encodeURIComponent(searchTerm)}`);
        const data = await res.json();
        setSearchResults(data.data);
      } catch (err) {
        console.error("Failed to fetch exercises:", err);
      }
    };

    fetchExercises();
  }, [searchTerm]);

  const handleSelectSearchItem = (item) => {
    // Prevent duplicates
    if (!exerciseItems.find((ex) => ex.id === item.id)) {
      setExerciseItems([...exerciseItems, item]);
    }

    setSearchTerm("");
    setSearchResults([]);
  };

  const handleEditItem = (id, newItem) => {
    const updatedItems = exerciseItems.map((item) =>
      item.id === id ? { ...item, name: newItem } : item
    );
    setExerciseItems(updatedItems);
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

      <div className="search-container">
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchResults.length > 0 && (
          <ul className="search-dropdown">
            {searchResults.map((item) => (
              <li key={item.id} onClick={() => handleSelectSearchItem(item)}>
                {item.name} ({item.primaryMuscles})
              </li>
            ))}
          </ul>
        )}
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

      {exerciseItems.length > 0 && (
        <button onClick={handleClearItems} className="btn-clear">
          Clear List
        </button>
      )}
    </div>
  );
};

export default ExerciseComponent;
