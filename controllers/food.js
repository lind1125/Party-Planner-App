const express = require('express')
let db = require('../models')
const router = express.Router()
const axios = require('axios')
const isLoggedIn = require('../middleware/isLoggedIn')

router.get('/', isLoggedIn, (req, res)=>{
    console.log(req.user.id)
    db.faveRecipe.findAll({
        where: {userId: req.user.id}
    })
    .then(foundRecipes=>{
        console.log(foundRecipes[0].name)
        foundRecipes.forEach(recipe=>{
            console.log(`Here are the recipes: ${recipe.name}`)
        })
        res.render('food/main', {faveRecipes: foundRecipes})
    })
})

router.get('/results', (req, res)=>{
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${req.query.keyword}&apiKey=${process.env.FOOD_KEY}`)
    .then(response =>{
        let results = response.data.results
        res.render('food/results', {results: results})
    })
    .catch(err=>{
        console.log('ERROR HAPPENING:', err)
    })
})

router.get('/:recipe_id', (req, res)=>{
    axios.get(`https://api.spoonacular.com/recipes/${req.params.recipe_id}/information?includeNutrition=false&apiKey=${process.env.FOOD_KEY}`)
    .then(response =>{
        // res.send(response.data)
        let recipeInfo = response.data
        res.render('food/show', {recipeInfo: recipeInfo})
    })
})

// POST route to save recipes

//GET route to display saved recipes

module.exports = router