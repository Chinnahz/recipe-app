import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { store } from "../src/redux/store";
import RecipeDetailPage from "../src/pages/RecipeDetailPage";  // Ensure correct path
import App from "./App";  // Ensure correct path

describe("App Component", () => {
  test("renders RecipeList on default route (/)", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Recipe List/i)).toBeInTheDocument();
  });

  test("renders RecipeDetailPage on /recipe/:id", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/recipe/1"]}>
          <Routes>
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Recipe Details/i)).toBeInTheDocument();
  });
});
