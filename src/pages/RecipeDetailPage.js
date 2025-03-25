import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Card, ListGroup } from "react-bootstrap";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const recipe = useSelector((state) =>
    state.recipes.recipes.find((r) => r.id === parseInt(id))
  );

  if (!recipe) return <p>Recipe not found!</p>;

  return (
    <Container>
      <Card className="mt-4">
        <Card.Img variant="top" src={recipe.image} />
        <Card.Body>
          <Card.Title>{recipe.name}</Card.Title>
          <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
          <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
          <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} mins</p>
          <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} mins</p>
          <p><strong>Servings:</strong> {recipe.servings}</p>
          <p><strong>Calories:</strong> {recipe.caloriesPerServing} kcal</p>

          <h5>Ingredients</h5>
          <ListGroup>
            {recipe.ingredients.map((ing, index) => (
              <ListGroup.Item key={index}>{ing}</ListGroup.Item>
            ))}
          </ListGroup>

          <h5 className="mt-3">Instructions</h5>
          <ol>
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RecipeDetailPage;
    