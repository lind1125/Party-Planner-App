const express = require('express')
const router = express.Router()
const axios = require('axios')


router.get('/', (req, res)=>{
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${req.query.keyword}&apiKey=${process.env.FOOD_KEY}`)
    .then(response =>{
        let results = response.data.results
        res.render('food/main', {results: results})
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