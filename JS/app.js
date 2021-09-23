const express = require('express')
const session = require('express-session')
const Controller = require('./controllers/controller')
const port = 3000
const app = new express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.static('publics'))
app.use(express.json())
app.use(session({
    secret: 'jangan dibuka',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))


// Register routes
app.get('/sellers/register', Controller.getRegister)
app.post('/sellers/register', Controller.postRegister)

// Add profile routes
app.get('/sellers/:id/add-profile', Controller.getAddProfile)
app.post('/sellers/:id/add-profile', Controller.postAddProfile)

// Login routes
app.get('/sellers/login', Controller.getLogin)
app.post('/sellers/login', Controller.postLogin)

app.use((req, res, next) => {
    let isLogin = req.session.isLogin
    let userId = req.session.userId
    if(isLogin && userId) {
        next()
    } else {
        res.redirect('/sellers/login')
    }
})

app.get('/sellers/:id', Controller.home)

// Profile routes
app.get('/sellers/:id/profile', Controller.showProfile)

// Edit product routes
app.get('/sellers/:id/edit', Controller.getEditProduct)
app.post('/sellers/:id/edit', Controller.postEditProduct)

// Add-category routes
app.get('/sellers/:id/add-category', Controller.getAddCategory)
app.post('/sellers/:id/add-category', Controller.postAddCategory)

// Add-product routes
app.get('/sellers/:id/add-product', Controller.getAddProduct)
app.post('/sellers/:id/add-product', Controller.postAddProduct)

// Logout routes
app.get('/sellers/:id/logout', Controller.logout)


app.listen(port, () => {
    console.log('App running on http://localhost:' + port)
})