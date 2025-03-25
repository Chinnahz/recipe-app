import React from 'react'
import {Form} from "react-bootstrap";

const SearchBar = ({searchTerm, setSearchTerm}) => {
  return (
    <Form.Control
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e)=> setSearchTerm(e.target.value)}
    />
  )
}

export default SearchBar