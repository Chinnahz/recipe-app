import {render, screen, fireEvent} from '@testing-library/react';
import Filters from './Filters';

test("render filter dropdowns and updates selected value", () => {
    const setFilter = jest.fn();
    const filter = {cuisine: "", difficulty: ""};

    render(<Filters filter={filter} setFilter={setFilter} />);

    const cuisineDropdown = screen.getAllByRole("combobox")[0];
    const difficultyDropdown = screen.getAllByRole("combobox")[1];

    expect(cuisineDropdown).toBeInTheDocument();
    expect(difficultyDropdown).toBeInTheDocument();

    fireEvent.change(cuisineDropdown, {target: {value: "Italian"}});
    expect(setFilter).toHaveBeenCalledWith({...filter, cuisine: "Italian"});

    fireEvent.change(difficultyDropdown, {target: {value: "Easy"}});
    expect(setFilter).toHaveBeenCalledWith({...filter, difficulty: "Easy"});
});