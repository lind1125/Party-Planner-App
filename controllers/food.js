const express = require('express')
let db = require('../models')
const router = express.Router()
const axios = require('axios')
const isLoggedIn = require('../middleware/isLoggedIn')

//GET route to display faved recipes and search form
router.get('/', isLoggedIn, (req, res)=>{
    db.faveRecipe.findAll({
        where: {userId: req.user.id}
    })
    .then(foundRecipes=>{
        res.render('food/main', {faveRecipes: foundRecipes})
    })
})

//GET route to display search query results
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

// POST route to save recipes
router.post('/:recipe_id/favorites', (req, res)=>{ 
    db.faveRecipe.findOrCreate({
        where: {
            name: req.body.name,
            image: req.body.image,
            apiId: parseInt(req.body.apiId)
        }
    })
    .then(([faveRecipe, created])=>{
        db.user.findByPk(req.user.id)
        .then(foundUser=>{
            foundUser.addFaveRecipe(faveRecipe)
            console.log(`${foundUser.name} has added ${faveRecipe.name} to their favorites`)
        })
        res.redirect('/food')
    })
    .catch(err=>{
        console.log("ERROR:", err)
    })
})


//GET route to display information for an individual recipe
router.get('/:recipe_id', (req, res)=>{
    axios.get(`https://api.spoonacular.com/recipes/${req.params.recipe_id}/information?includeNutrition=false&apiKey=${process.env.FOOD_KEY}`)
    .then(response =>{
        // res.send(response.data)
        let recipeInfo = response.data
        console.log(recipeInfo)
        res.render('food/show', {recipeInfo: recipeInfo})
    })
})

module.exports = router