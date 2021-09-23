const express = require('express')
const Controller = require('./controllers/controller')
const port = 3000
const app = new express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.static('publics'))

// Add-category routes
app.get('/', Controller.home)
app.get('/sellers/add-category', Controller.getAddCategory)
app.post('/sellers/add-category', Controller.postAddCategory)

// Add-product routes
app.get('/sellers/add-product', Controller.getAddProduct)
app.post('/sellers/add-product', Controller.postAddProduct)

app.listen(3000, () => {
    console.log(`app listening at http://localhost:${port}`)
})