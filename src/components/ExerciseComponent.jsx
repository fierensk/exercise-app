import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ExerciseItemComponent from "./ExerciseItemComponent";

const ExerciseComponent = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const [exerciseItems, setExerciseItems] = useState([]); // Selected task list
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Dropdown results
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

  const handleAddItems = () => {
    console.log('Added Items');

    fetch('http://localhost:3000/addList', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({ data: exerciseItems })
    }).then((response) => console.log(response.json()));
  };

  const handleViewItem = () => {
    navigate('/exercise-app/lists');
  };

  return (
    <div className="main-container">
      {/* Workout of the Day Section */}
      <section className="daily-workout-container">
        <div className="daily-workout">
          <h2>Workout of the Day</h2>
          <h3>{wod.name}</h3>
          <p>A great move to get your body moving 💪</p>
          <img
            src={wod.gif}
            alt={`${wod.name} GIF`}
            className="workout-gif"
          />
        </div>
      </section>
  
      {/* Main Workout List Section */}
      <section className="workout-list">
        <h1>Workout List</h1>
        <button onClick={handleViewItem} className="btn-view" style={{marginBottom: '1rem', color: '#ff7043'}}>
          View Workout Lists
        </button>
        <div className="search-container">
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
          <div>
            <button onClick={handleAddItems} className="btn-add" style={{marginRight: '1rem'}}>
              Add List
            </button>
            <button onClick={handleClearItems} className="btn-clear">
              Clear List
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ExerciseComponent;