const express = require('express')
const router = express.Router()
const axios = require('axios')


router.get('/', (req, res)=>{
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${req.query.keyword}&apiKey=${process.env.FOOD_KEY}`)
    .then(response =>{
        let results = response.data.results
        res.render('food/show', {results: results})
    })
    .catch(err=>{
        console.log('ERROR HAPPENING:', err)
    })
})

module.exports = router