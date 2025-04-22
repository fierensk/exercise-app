import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ExerciseComponent from "./components/ExerciseComponent.jsx";
import ViewListComponent from "./components/ViewListComponent.jsx";
import "./style.css";

/*
acts as the root component and just renders exercisecomponent
*/

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/exercise-app/" element={<ExerciseComponent />} />
        <Route path="/exercise-app/lists/" element={<ViewListComponent />} />
      </Routes>
    </Router>
  );
}

export default App;