const express = require('express')
const router = express.Router()

// guest index route
router.get('/', (req, res)=>{
    res.render('guests/main')
})

// POST /guest create a new guest
router.post('/', (req, res)=>{

})

// GET /guest/new - display form to create new guest
router.get('/new', (req, res)=>{

})

module.exports = router