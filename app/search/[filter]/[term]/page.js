"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ExerciseCard from "@/components/exerciseCard";
import RecipeCard from "@/components/recipeCard";
import NavBar from "@/components/navBar";

const page = ({ params }) => {
  const [res, setRes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:5000/${params.filter}/search?query=${params.term}`
        );
        setRes(result.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="results">
        {(res.exercises || res.recipes) &&
          (res.exercises || res.recipes).map((d) =>
            params.filter === "exercises" ? (
              <ExerciseCard
                key={d.exercise_id}
                id={d.exercise_id}
                name={d.exercise_name}
                description={d.description}
              />
            ) : params.filter === "recipes" ? (
              <RecipeCard
                key={d.recipe_id}
                id={d.recipe_id}
                name={d.recipe_name}
                instructions={d.instructions}
                image={d.recipe_image_url}
                calories={d.total_calories}
                protein={d.total_protein}
                carbohydrates={d.total_carbohydrates}
                fat={d.total_fat}
              />
            ) : null
          )}
      </div>
    </div>
  );
};

export default page;
