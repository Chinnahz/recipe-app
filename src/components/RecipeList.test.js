import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import recipeReducer from "../redux/recipeSlice"; // Ensure correct path
import RecipeList from "../components/RecipeList";

// Function to create a mock Redux store
const createTestStore = (preloadedState) => {
  return configureStore({
    reducer: {
      recipes: recipeReducer, // Provide the actual reducer
    },
    preloadedState,
  });
};

describe("RecipeList Component", () => {
  let store;

  beforeEach(() => {
    store = createTestStore({
      recipes: {
        recipes: [
          {
            id: 1,
            name: "Spaghetti Bolognese",
            cuisine: "Italian",
            difficulty: "Medium",
            image: "spaghetti.jpg",
          },
          {
            id: 2,
            name: "Chicken Curry",
            cuisine: "Indian",
            difficulty: "Hard",
            image: "chicken-curry.jpg",
          },
        ],
        loading: false,
        error: null,
      },
    });
  });

  test("renders loading state correctly", () => {
    store = createTestStore({
      recipes: { recipes: [], loading: true, error: null },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RecipeList />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("renders error state correctly", () => {
    store = createTestStore({
      recipes: { recipes: [], loading: false, error: "Failed to fetch" },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RecipeList />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
  });

  test("renders recipes correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RecipeList />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText("Spaghetti Bolognese")).toBeInTheDocument();
    expect(screen.getByText("Chicken Curry")).toBeInTheDocument();
  });

  test("filters recipes based on search input", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RecipeList />
        </BrowserRouter>
      </Provider>
    );
    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Spaghetti" } });
    expect(screen.getByText("Spaghetti Bolognese")).toBeInTheDocument();
    expect(screen.queryByText("Chicken Curry")).toBeNull();
  });

  test("filters recipes based on cuisine selection", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RecipeList />
        </BrowserRouter>
      </Provider>
    );
    const cuisineDropdown = screen.getByLabelText("Cuisine");
    fireEvent.change(cuisineDropdown, { target: { value: "Italian" } });
    expect(screen.getByText("Spaghetti Bolognese")).toBeInTheDocument();
    expect(screen.queryByText("Chicken Curry")).toBeNull();
  });
});
