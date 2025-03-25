import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import RecipeList from "./components/RecipeList";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
