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

// GET edit route - display form to edit guest info
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

//PUT route - update guest info
router.put('/:guest_id', isLoggedIn, (req, res)=>{
    db.guest.update({
            name: req.body.name,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
            allergies: req.body.allergies
        }, {
            where: {
                id: req.params.guest_id 
            }
        })
        .then(numRowsChanged=>{
            console.log(numRowsChanged)
            res.redirect('/guests')
        })
        .catch(err=>{
            console.log('ERROR:', err)
        })       
    })


// delete route to remove guest
router.delete('/:guest_id', isLoggedIn, (req, res)=>{
    db.guest.destroy({
        where: {                
            id: req.params.guest_id 
        }
    }).then(numRowsDeleted=>{
        console.log(numRowsDeleted)
        res.redirect('/guests')
    })
    .catch(err=>{
        console.log('ERROR:', err)
    }) 
})


//POST route to add to party plan
router.post('/add', isLoggedIn, (req, res)=>{
    // console.log(req.body.id)
    db.party.findOrCreate({
        where: {
            guestId: req.body.id
        },
        defaults: {
            userId: req.user.id
        }
    })
    .then(([party, created])=>{
        console.log(`${req.body.name} added to party plan`)
        res.redirect('/')
    })
    .catch(err=>{
        console.log("ERROR:", err)
    })
})

module.exports = router