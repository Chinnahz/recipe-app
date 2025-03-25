import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import RecipeDetailPage from "./RecipeDetailPage"; // Adjust the path as needed

const mockStore = configureStore([]);

describe("RecipeDetailPage", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      recipes: {
        recipes: [
          {
            id: 1,
            name: "Spaghetti Carbonara",
            cuisine: "Italian",
            difficulty: "Medium",
            prepTimeMinutes: 15,
            cookTimeMinutes: 20,
            servings: 4,
            caloriesPerServing: 500,
            ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan Cheese"],
            instructions: ["Boil pasta", "Cook pancetta", "Mix with eggs and cheese"],
            image: "test-image.jpg",
          },
        ],
      },
    });
  });

  test("renders recipe details correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/recipe/1"]}>
          <Routes>
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Spaghetti Carbonara")).toBeInTheDocument();
    expect(screen.getByText(/Cuisine:/i)).toHaveTextContent("Cuisine: Italian");
    expect(screen.getByText(/Difficulty:/i)).toHaveTextContent("Difficulty: Medium");
    expect(screen.getByText(/Prep Time:/i)).toHaveTextContent("Prep Time: 15 mins");
    expect(screen.getByText(/Cook Time:/i)).toHaveTextContent("Cook Time: 20 mins");
    expect(screen.getByText(/Servings:/i)).toHaveTextContent("Servings: 4");
    expect(screen.getByText(/Calories:/i)).toHaveTextContent("Calories: 500 kcal");
    expect(screen.getByText("Boil pasta")).toBeInTheDocument();
    expect(screen.getByText("Cook pancetta")).toBeInTheDocument();
    expect(screen.getByText("Mix with eggs and cheese")).toBeInTheDocument();
  });

  test("renders 'Recipe not found' when recipe does not exist", () => {
    store = mockStore({ recipes: { recipes: [] } });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/recipe/99"]}>
          <Routes>
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Recipe not found!")).toBeInTheDocument();
  });
});