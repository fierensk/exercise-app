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

  const workouts = [
    { name: "Burpees", gif: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif" },
    { name: "Mountain Climbers", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHJiODFqcWFza2RvYXZvcWlzdHZwdGZ0ZngwemxhNXFsdzBmeDBxdSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ov9jSWE1PXj0TVK1y/giphy.gif" },
    { name: "Jumping Jacks", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHJiODFqcWFza2RvYXZvcWlzdHZwdGZ0ZngwemxhNXFsdzBmeDBxdSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/0pzLcdeSHCG75b4zUl/giphy.gif" }
  ];
  
  const [wod, setWod] = useState(workouts[0]);
  
  useEffect(() => {
    const random = Math.floor(Math.random() * workouts.length);
    setWod(workouts[random]);
  }, []);

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
    if (!exerciseItems.find((ex) => ex.id === item.id)) {
      const newItem = {
        ...item,
        sets: 3,
        reps: 10
      };
      setExerciseItems([...exerciseItems, newItem]);
    }
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleEditItem = (id, updatedItem) => {
    const updatedItems = exerciseItems.map((item) =>
      item.id === id ? updatedItem : item
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

  const handleAddItems = () => {
    fetch('http://localhost:3000/addList', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({ data: exerciseItems })
    });
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
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchResults.length > 0 && (
            <ul className="search-dropdown">
              {searchResults.map((item) => (
                <li key={item.id} onClick={() => handleSelectSearchItem(item)}>
                  <strong>{item.name}</strong>{" "}
                  <span style={{ color: "#666", fontSize: "0.9rem" }}>
                    ({item.primaryMuscles?.replace(/[\[\]"]/g, "")})
                  </span>
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
