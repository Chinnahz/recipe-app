import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import recipeReducer, {fetchRecipes} from '../redux/recipeSlice'

jest.mock('axios');

describe("recipeSlice", ()=> {
    it("should handle fetchRecipes.fulfilled", async () => {
        const mockData = {recipes: [{id: 1, name: "Pasta", cuisine: "Italian"}]};
        axios.get.mockResolvedValueOnce({data: mockData});

        const store = configureStore({reducer: {recipes: recipeReducer}});
        await store.dispatch(fetchRecipes());

        const state = store.getState().recipes;
        expect(state.recipes).toHaveLength(1);
        expect(state.recipes[0].name).toBe("Pasta")
    });
});