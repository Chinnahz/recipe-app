import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes} from "../redux/recipeSlice";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import SearchBar from "./SearchBar";
import Filters from "./Filters";

const RecipeList = () => {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector((state) => state.recipes);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({cuisine: "", difficulty: ""});

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log("recipes: ", recipes)
    
  const filteredRecipes = recipes.filter((recipe) => {
    return (
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter.cuisine ? recipe.cuisine === filter.cuisine : true) &&
        (filter.difficulty ? recipe.difficulty === filter.difficulty : true)
    );
  });
  return (
    <Container>
      <div className="d-flex justify-content-between mb-4">
         <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />   
         <Filters filter={filter} setFilter={setFilter} />   
      </div>
      <Row>
        {filteredRecipes.map((recipe) => (
            <Col md={4} key={recipe.id} className="mb-4">
                <Card>
                    <Card.Img variant="top" src={recipe.image} />
                    <Card.Body>
                        <Card.Title>{recipe.name}</Card.Title>
                        <Card.Text>Cuisine: {recipe.cuisine}</Card.Text>
                        <Link to={`/recipe/${recipe.id}`} className="btn btn-primary">View Recipe</Link>
                    </Card.Body>
                </Card>
            </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RecipeList;
