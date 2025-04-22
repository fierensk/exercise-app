import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './../style.css';

const ViewListComponent = () => {
    const navigate = useNavigate();
    const [listItems, setListItems] = useState([]);

    const addListsToPage = async () => {
        const res = await fetch('http://localhost:3000/getLists');
        const lists = await res.json();
        console.log(lists.data);
        
        setListItems(lists.data);
    };

    const handleViewItem = () => {
        navigate('/exercise-app/');
    };

    // Loads lists from database to page when page loads
    useEffect(() => { addListsToPage(); }, []);

    return (
        <div className="main_container" style={{margin:0, padding:0, overflowX: 'hidden'}}>
            <section className="workout-list">
            <h1>Workout Lists</h1>
            <button onClick={handleViewItem} className="btn-view" style={{marginBottom: '1rem', color: '#ff7043'}}>
                Search for Workouts
            </button>
            {Object.keys(listItems).length > 0 && (
                <ul className="search-dropdown" style={{position: 'relative', margin:'2rem', width:'90%'}}>
                {Object.keys(listItems).map((item) => (
                    <li key={item} className="exercise-item" style={{ flexDirection: 'column' }}>
                        <h3 style={{ marginBottom: '-1rem', color: '#ff7043' }}>{item}</h3>
                        <ol className="exercise-info">{Object.keys(listItems[item]).map((exercise) => (
                            <li className="listed-exercises" key={listItems[item][exercise]["listId"]} style={{ color: "#666", font: "0.9rem", padding: 0, margin: 0 }}>
                                <div>
                                    <strong>{listItems[item][exercise]["name"]}:</strong> {listItems[item][exercise]["reps"]} reps, {listItems[item][exercise]["sets"]} sets
                                    <p>{listItems[item][exercise]["instructions"]?.replace(/[\[\]",]/g, " ")}</p>
                                </div>
                            </li>
                        ))}</ol>
                    </li>
                ))}
                </ul>
            )}
            </section>
        </div>
    );
};

export default ViewListComponent;