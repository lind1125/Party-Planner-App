const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')

//GET route to display signup form
router.get('/signup', (req, res)=>{
    res.render('auth/signup')
})
//POST route to add new user
router.post('/signup', (req, res)=>{
    console.log('sign up form user input:', req.body)
    db.user.findOrCreate({     // check if the user already exists
        where: {email: req.body.email},
        defaults: {
            name: req.body.name,
            password: req.body.password
        }
    }) // create a new user if email wasn't found
    .then(([createdUser, wasCreated])=>{
        if(wasCreated){
            console.log('just created the following user:', createdUser)
            // log the new user in
            passport.authenticate('local', {
                successRedirect: '/',
                successFlash: 'Account created and logged in!' // !-> FLASH <-!
            })(req, res) // IIFE = immediately invoked function
        } else {
            req.flash('error', 'email already exists, try logging in') // !-> FLASH <-!
            // redirect to login page
            res.redirect('/auth/login') // a redirect starts a new request object
            // console.log('An account associated with that email address already exists! Try logging in.')
        }
    })
    .catch(err=>{
        req.flash('error', err.message) // !-> FLASH <-!
        res.redirect('/auth/signup') // redirect to signup page so they can try again
    })
})

//GET route to display login form
router.get('/login', (req, res)=>{
    res.render('auth/login')
})

// POST route for User login
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login',
    successRedirect: '/',
    failureFlash: 'Invalid email or password!', // !-> FLASH <-!
    successFlash: 'You are now logged in!' // !-> FLASH <-!
}))

// User logout
router.get('/logout', (req, res)=>{
    req.logout()
    req.flash('success', 'Successfully logged out!') // !-> FLASH <-!
    res.redirect('/')
})





module.exports = router