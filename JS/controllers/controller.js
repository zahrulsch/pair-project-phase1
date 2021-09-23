const {Category} = require('../models')

class Controller {
    static home(req,res) {
        res.render('home')
    }

    static getAddCategory(req, res) {
        res.render('add-category')
    }

    static postAddCategory(req, res) {
        const {name} = req.body
        const createdAt = new Date()
        const updatedAt = new Date()
        
        Category.create({
            name,
            createdAt,
            updatedAt
        }).then( _ => {
            res.send('Berhasil menambahkan kategori')
        }).catch(err => {
            res.send(err)
        })
    }

    static getAddProduct(req, res) {
        Category.findAll({})
            .then(categories => {
                res.render('add-product', { categories })
            })
            .catch(err => {
                res.send(err)
            })
    }
    
    static postAddProduct(req, res) {
        res.send(req.body)
    }
}

module.exports = Controller