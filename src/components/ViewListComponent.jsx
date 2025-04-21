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
        lists.data.map((item) => {console.log(item);});
    };

    const handleViewItem = () => {
        navigate('/exercise-app/');
    };

    // Loads lists from database to page when page loads
    useEffect(() => { addListsToPage(); }, []);

    return (
        <div className="main_container" style={{margin:0, padding:0, overflowX:'hidden'}}>
            <section className="workout-list" style={{overflowX:'hidden'}}>
            <h1>Workout Lists</h1>
            <button onClick={handleViewItem} className="btn-view" style={{marginBottom: '1rem', color: '#ff7043'}}>
                Search for Workouts
            </button>
            {listItems.length > 0 && (
                <ul className="search-dropdown" style={{position: 'relative', margin:'2rem', width:'90%'}}>
                {listItems.map((item) => (
                    <li key={item.id}>
                        <strong>List #{item.id}</strong>{" "}
                        <span style={{ color: "#666", fontSize: "0.9rem" }}>
                            ({ item.exercise_ids })
                        </span>
                    </li>
                ))}
                </ul>
            )}
            </section>
        </div>
    );
};

export default ViewListComponent;