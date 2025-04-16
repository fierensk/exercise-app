import React, { useState } from "react";

const ExerciseItemComponent = ({ item, handleEditItem, handleDeleteItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState(item.name);
  const [errors, setErrors] = useState("");

  const onEdit = () => {
    if (newItem.trim()) {
      handleEditItem(item.id, newItem.trim());
      setIsEditing(false);
      setErrors("");
    } else {
      setErrors("Exercise item must not be empty.");
    }
  };

  return (
    <>
      <li>
        {isEditing ? (
          <input
            type="text"
            className="edit-input"
            value={newItem}
            onChange={(event) => setNewItem(event.target.value)}
          />
        ) : (
          <span>{item.name}</span>
        )}

        <div>
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
