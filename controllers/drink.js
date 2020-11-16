const express = require('express')
let db = require('../models')
const router = express.Router()
const axios = require('axios')
const isLoggedIn = require('../middleware/isLoggedIn')


//GET route to display faved cocktails and search form
router.get('/', isLoggedIn, (req, res)=>{
    console.log(req.user.id)
    db.faveDrink.findAll({
        where: {userId: req.user.id}
    })
    .then(foundDrinks=>{
        // console.log(foundDrinks[0].name)
        foundDrinks.forEach(drink=>{
            console.log(`Here are the cocktails: ${drink.name}`)
        })
        res.render('drink/main', {faveDrinks: foundDrinks})
    })
})

router.get('/results', (req, res)=>{
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.query.keyword}`) // query should be ${req.query.keyword}
    .then(response =>{
        let drinkInfo = response.data.drinks
        res.render('drink/results', {drinkInfo: drinkInfo})
    })
    .catch(err=>{
        console.log('ERROR HAPPENING:', err)
    })
    // res.send('THIS IS THE DRINK PAGE')
})

// POST route to save cocktails

router.post('/:drink_id/favorites', (req, res)=>{
    db.faveDrink.findOrCreate({
        where: {
            name: req.body.name,
            image: req.body.image,
            apiId: parseInt(req.body.apiId)
        }
    })
    .then(([faveDrink, created])=>{
        db.user.findByPk(req.user.id)
        .then(foundUser=>{
            foundUser.addFaveDrink(faveDrink)
            console.log(`${foundUser.name} has added ${faveDrink.name} to their favorites`)
        })
        res.redirect('/drink')
    })
    .catch(err =>{
        console.log('ERROR:', err)
    })
})


router.get('/:drink_id', (req, res)=>{
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${req.params.drink_id}`)
    .then(response=>{
        // res.send(response.data)
        let drinkInfo = response.data.drinks[0]
        // console.log(drinkInfo.strDrink)
        res.render('drink/show', {drinkInfo: drinkInfo})
    })
    .catch(err=>{
        console.log('ERROR HAPPENING:', err)
    })
})


module.exports = router