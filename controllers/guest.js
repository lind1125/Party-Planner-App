const express = require('express')
let db = require('../models')
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')


// guest index route
router.get('/', isLoggedIn, (req, res)=>{
    db.guest.findAll({
        where: {userId: req.user.id}
    })
    .then(foundGuests=>{
        res.render('guests/main', {guests: foundGuests})
    })
})

// POST /guest create a new guest
router.post('/', (req, res)=>{
    db.guest.findOrCreate({
        where: {
            name: req.body.name,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
            allergies: req.body.allergies
        }
    })
    .then(([guest, created])=>{
        db.user.findByPk(req.user.id)
        .then(foundUser=>{
            foundUser.addGuest(guest)
            console.log(`${foundUser.name} has added ${guest.name} to their guests`)
        })
        res.redirect('/guests')
    })
})

// GET /guest/new - display form to create new guest
router.get('/new', (req, res)=>{
    res.render('guests/new')
})

// edit route
router.get('/edit/:guest_id', isLoggedIn, (req, res)=>{
     db.guest.findOne({
         where: {
             id: req.params.guest_id 
        }
     })
     .then(foundGuest=>{
         res.render('guests/edit', {foundGuest: foundGuest})
     })
})
// delete route
module.exports = router