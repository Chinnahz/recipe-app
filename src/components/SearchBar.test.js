import SearchBar from "./SearchBar";
import {render, screen, fireEvent} from '@testing-library/react';


test("renders seacrch bar and updates input value", ()=> {
    const setSearchTerm = jest.fn();
    render(<SearchBar searchTerm="" setSearchTerm={setSearchTerm} />);

    const input = screen.getByPlaceholderText("Search recipes...");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, {target: {value: "Pasta"}});
    expect(setSearchTerm).toHaveBeenCalledWith("Pasta");
})
