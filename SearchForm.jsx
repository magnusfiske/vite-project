import { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import ApiCall from "./ApiCall"
import './SearchForm.css'

function SearchForm() {
    const [ingredients, setIngredients] = useState("");
    const [item, setItem] = useState({ meal: ""});
    const [triggerSearch, setTriggerSearch] = useState(false)
  
    const { meal } = item;
  
    const handleChange = e => {
        e.persist();
  
        setItem(prevState => ({
        ...prevState,
        meal: e.target.value
        }));
    };
  
      const handleSubmit = e => {
          e.preventDefault();
          setTriggerSearch((triggerSearch) => !triggerSearch)
      };
  
      return (
          <>
          <div className="search">
          <form onSubmit={handleSubmit}>
          <label>What do you have?
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)} />
          </label>
          
          
          <Form.Group controlId="meal" className="radios">
          <Form.Check
            value="breakfast"
            type="radio"
            aria-label="radio 1"
            label="Breakfast"
            onChange={handleChange}
            checked={meal === "breakfast"}
          />
          <Form.Check
            value="lunch"
            type="radio"
            aria-label="radio 2"
            label="Lunch"
            onChange={handleChange}
            checked={meal === "lunch"}
          />
          <Form.Check
            value="dinner"
            type="radio"
            aria-label="radio 3"
            label="Dinner"
            onChange={handleChange}
            checked={meal === "dinner"}
          />
        </Form.Group>
        <input type="submit" />
        </form>
  
        </div>
        <ApiCall food={meal} ingredients={ingredients} triggerSearch={triggerSearch}/>
       
        </>
  
      )
}

export default SearchForm;