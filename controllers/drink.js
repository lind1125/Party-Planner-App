const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/', (req, res)=>{
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.query.keyword}`)
    .then(response =>{
        let results = response.data.drinks
        res.render('drink/main', {results: results})
    })
    .catch(err=>{
        console.log('ERROR HAPPENING:', err)
    })
    // res.send('THIS IS THE DRINK PAGE')
})

module.exports = router