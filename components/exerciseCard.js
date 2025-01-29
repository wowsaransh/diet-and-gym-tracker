import axios from "axios";
import React, { useEffect, useState } from "react";

const ExerciseCard = ({ id, name, description, onRemove }) => {
  const [add, setAdd] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/exercises/user/check",
          { params: { userId, exerciseId: id } }
        );
        setAdd(response.data.exists);
      } catch (err) {
        console.error("Error checking exercise:", err);
      }
    };
    fetchData();
  }, [id, userId]);

  const handleClick = async () => {
    if (add) {
      try {
        await axios.delete("http://localhost:5000/exercises/user", {
          data: { userId: userId, exerciseId: id },
        });
        setAdd(false);
        onRemove(id);
      } catch (err) {
        console.error("Error deleting exercise:", err);
      }
    } else {
      try {
        await axios.post("http://localhost:5000/exercises/user", {
          userId: userId,
          exerciseName: name,
        });
        setAdd(true);
      } catch (err) {
        console.error("Error adding recipe:", err);
      }
    }
  };
  return (
    <div className="exercise-card">
      <div className="info">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
      <button onClick={handleClick}>{add ? "Remove" : "Add"}</button>
    </div>
  );
};

export default ExerciseCard;
