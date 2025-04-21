import React, { useEffect, useState } from "react";
import './../style.css';

const ViewListComponent = () => {
    const [listItems, setListItems] = useState([]);

    const addListsToPage = async () => {
        const res = await fetch('http://localhost:3000/getLists');
        const lists = await res.json();
        console.log(lists.data);
        
        setListItems(lists.data);
        lists.data.map((item) => {console.log(item);});
    };

    // Loads lists from database to page when page loads
    useEffect(() => { addListsToPage(); }, []);

    return (
        <div className="main_container" style={{margin:0, padding:0}}>
            <section className="workout-list" 
                style={{overflowX:'hidden'}}>
            <h1>Workout Lists</h1>
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