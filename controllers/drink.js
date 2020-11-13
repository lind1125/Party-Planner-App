const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/', (req, res)=>{
    res.render('drink/main')
})

router.get('/results', (req, res)=>{
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.query.keyword}`) // query should be ${req.query.keyword}
    .then(response =>{
        let results = response.data.drinks
        res.render('drink/results', {results: results})
    })
    .catch(err=>{
        console.log('ERROR HAPPENING:', err)
    })
    // res.send('THIS IS THE DRINK PAGE')
})

router.get('/:drink_id', (req, res)=>{
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${req.params.drink_id}`)
    .then(response=>{
        // res.send(response.data)
        let results = response.data.drinks[0]
        // console.log(results.strDrink)
        res.render('drink/show', {results: results})
    })
    .catch(err=>{
        console.log('ERROR HAPPENING:', err)
    })
})


module.exports = router