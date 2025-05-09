import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
/*
  Entry point for react app, renders the app to the DOM and gets backend data from /api
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Communicates with backend to output message and all data queried from database
fetch('/api')
  .then((res) => res.json())
  .then((data) => {
    console.log(data["message"]);
});