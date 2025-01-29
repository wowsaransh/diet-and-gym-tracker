"use client";

import NavBar from "@/components/navBar";
import { useEffect, useState } from "react";
import axios from "axios";
import ExerciseCard from "@/components/exerciseCard";
import RecipeCard from "@/components/recipeCard";

export default function Home() {
  const [uid, setUserId] = useState();
  const [exercises, setExercises] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [showExercises, setShowExerises] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        window.location.href = "/login";
      } else {
        setUserId(userId);

        axios
          .get(`http://localhost:5000/exercises/user?userId=${userId}`)
          .then((exeRes) => {
            setExercises(exeRes.data);
            console.log(exercises);
          })
          .catch((err) => {
            console.error("Error fetching exercises", err);
          });

        axios
          .get(`http://localhost:5000/recipes/user?userId=${userId}`)
          .then((recRes) => {
            setRecipes(recRes.data);
            console.log(recipes);
          })
          .catch((err) => {
            console.error("Error fetching recipes", err);
          });
      }
    };

    fetchData();
  }, [uid]);

  const handleToggle = (showExercises) => {
    setShowExerises(showExercises);
  };

  const handleExerciseRemove = (idToRemove) => {
    setExercises(
      exercises.filter((exercise) => exercise.exercise_id !== idToRemove)
    );
  };

  const handleRecipeRemove = (idToRemove) => {
    setRecipes(recipes.filter((recipe) => recipe.recipe_id !== idToRemove));
  };

  return (
    <main>
      <NavBar />
      <div className="main">
        <div className="tab">
          <button onClick={() => handleToggle(true)}>Exercises</button>
          <button onClick={() => handleToggle(false)}>Recipes</button>
        </div>
        <div className="details">
          {showExercises ? (
            <>
              <h1>My Exercises</h1>
              {exercises.map((e) => (
                <ExerciseCard
                  key={e.exercise_id}
                  id={e.exercise_id}
                  name={e.exercise_name}
                  description={e.description}
                  onRemove={handleExerciseRemove}
                />
              ))}
            </>
          ) : (
            <>
              <h1>My Recipes</h1>
              {recipes.map((r) => (
                <RecipeCard
                  key={r.recipe_id}
                  id={r.recipe_id}
                  name={r.recipe_name}
                  instructions={r.recipe_instructions}
                  image={r.recipe_image_url}
                  calories={r.total_calories}
                  protein={r.total_protein}
                  carbohydrates={r.total_carbohydrates}
                  fat={r.total_fat}
                  onRemove={handleRecipeRemove}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
