import React, { useState, useEffect } from "react";
import axios from "axios";

const RecipeCard = ({
  id,
  name,
  instructions,
  image,
  calories,
  protein,
  carbohydrates,
  fat,
  onRemove,
}) => {
  const [add, setAdd] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/recipes/user/check",
          { params: { userId, recipeId: id } }
        );
        setAdd(response.data.exists);
      } catch (err) {
        console.error("Error checking recipe:", err);
      }
    };
    fetchData();
  }, [id, userId]);

  const handleClick = async () => {
    if (add) {
      try {
        await axios.delete("http://localhost:5000/recipes/user", {
          data: { userId: userId, recipeId: id },
        });
        setAdd(false);
        onRemove(id);
      } catch (err) {
        console.error("Error deleting recipe:", err);
      }
    } else {
      try {
        await axios.post("http://localhost:5000/recipes/user", {
          userId: userId,
          recipeName: name,
        });
        setAdd(true);
      } catch (err) {
        console.error("Error adding recipe:", err);
      }
    }
  };

  return (
    <div className="recipe-card">
      <div className="info">
        <h2>{name}</h2>
        <p>{instructions}</p>
        <img src={image} alt="" />
        <p>Calories: {calories}</p>
        <p>Protein: {protein} g</p>
        <p>Carbs: {carbohydrates} g</p>
        <p>Fats: {fat} g</p>
      </div>

      <button onClick={handleClick}>{add ? "Remove" : "Add"}</button>
    </div>
  );
};

export default RecipeCard;
