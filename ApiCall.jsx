import {useEffect, useState} from 'react'
import React, {Component} from 'react'
import './ApiCall.css'


function ApiCall(props) {
    const [recipes, setRecipes] = useState([])
    const [firstQuery, setFirstQuery] = useState([])
    const [secondQuery, setSecondQuery] = useState([])
    var skip = 0
    var results
    console.log(props.food)
    console.log(props.ingredients)
    console.log(props.triggerSearch)



    async function FetchRecipeByType() {
      if(props.food != "") {
        fetch(`https://api.spoonacular.com/recipes/complexSearch?type=${props.food}&number=100&skip=${skip}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'fab9f1e7670c48479e11b994a1023259'
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            setFirstQuery(data.results)
        })
      }
    }

    async function FetchRecipeByIngredient() {
      
        fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${props.ingredients}&number=100`, {
          headers: {
              'Content-Type': 'application/json',
              'X-Api-Key': 'fab9f1e7670c48479e11b994a1023259'
          }   
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            setSecondQuery(data)
        })
      
    }


    async function FilterRecipes(s) {
      
        await FetchRecipeByType(s)
        await FetchRecipeByIngredient()

        console.log(firstQuery)
        console.log(secondQuery)

        let secondQueryIds = secondQuery.map(element => {
            return element.id
        })
    
        results = firstQuery.filter(recipe => secondQueryIds.includes(recipe.id))
        
        setRecipes(results)
        console.log(recipes.length)
        console.log(results.length)
    }

    useEffect(() => {
        FilterRecipes()
    }, [props.triggerSearch])


    return (
      <div className="App">
          <ul>
            {recipes.map(recipe => (
              <li key={recipe.id}><img src={recipe.image}/><br/>{recipe.title}</li>
            ))}
          </ul>
      </div>
    )
}

export default ApiCall;