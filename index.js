require('dotenv').config()
const express = require('express')
let db = require('./models')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const methodOverride = require('method-override')

//method override middleware for PUT and DELETE routes
app.use(methodOverride('_method'))

// setup ejs and ejs layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// access static pages
app.use(express.static(__dirname + '/public/'))

// body parser middleware (this makes req.body work)
app.use(express.urlencoded({extended: false}))

//session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash middleware
app.use(flash())

// CUSTOM MIDDLEWARE
app.use((req, res, next)=>{
    // before every route, attach the flash messages and current user to res.locals
    // this will give us access to these values in all our ejs pages
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next() // move on to the next piece of middleware
})

// use controllers
app.use('/auth', require('./controllers/auth.js'))
app.use('/food', require('./controllers/food.js'))
app.use('/drink', require('./controllers/drink.js'))
app.use('/guests', require('./controllers/guest.js'))

// route for main page, displays faved items and guests for party plan
app.get('/', isLoggedIn, (req, res)=>{
    db.party.findAll({
        include: [db.faveDrink]
    }).then(party=>{
        res.render('home.ejs', {party: party})
    })
})

app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile.ejs')
})


app.listen(process.env.PORT, ()=>{
    console.log('BOO! It\'s port 8000')
})