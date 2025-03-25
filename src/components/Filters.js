import React from 'react'
import {Form} from 'react-bootstrap';

const Filters = ({filter, setFilter}) => {
  return (
    <div className="d-flex gap-3">
        <Form.Select value={filter.cuisine} onChange={(e)=> setFilter({...filter, cuisine: e.target.value})}>
        <option value="">All Cuisines</option>
        <option value="Italian">Italian</option>
        <option value="American">American</option>
        <option value="Mexican">Mexican</option>
        <option value="Mediterranean">Mediterranean</option>
        <option value="Korean">Korean</option>
        <option value="Indian">Indian</option>
        <option value="Asian">Asian</option>
        </Form.Select>

        <Form.Select value={filter.difficulty} onChange={(e)=> setFilter({...filter, difficulty: e.target.value})}>
        <option value="">All Difficulty Levels</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
        </Form.Select>
    </div>
  )
}

export default Filters