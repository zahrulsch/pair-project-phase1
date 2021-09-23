const {Category, Seller, Profile, Product} = require('../models')
const bcrypt = require('bcryptjs')
const formatMoney = require('../helpers/formatMoney')

class Controller {
    static home(req,res) {
        const sellerId = req.params.id
        const findProducts = Product.findAll({
            where: {
                SellerId: sellerId
            },
            include: [Category]
        })

        const findAllCategories = Category.findAll({})
        
        Promise.all([findProducts, findAllCategories])
            .then(data => {
                res.render('home', {sellerId : sellerId, products: data[0], categories: data[1], formatMoney: formatMoney})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static getEditProduct(req, res) {
        const sellerId = req.params.id
        let productId = req.query.productId
        if(productId) {
            let foundProduct = Product.findByPk(productId)
            let findAllCategories = Category.findAll()

            Promise.all([foundProduct, findAllCategories])
                .then(data => {
                    res.render('edit-product', {product: data[0], categories: data[1], sellerId: sellerId})
                })
                .catch(err => {
                    res.send(err)
                })
        }
    }

    static postEditProduct(req, res) {
        const SellerId = req.params.id
        const productId = req.query.productId
        console.log(productId)
        const {name, CategoryId, price, stock, description, imageUrl, videoUrl, weight} = req.body
        const updatedAt = new Date()

        Product.update({
            name,
            CategoryId,
            price,
            stock,
            weight,
            videoUrl,
            imageUrl,
            description,
            SellerId,
            updatedAt
        }, {
            where: {id: productId}
        }).then(data => {
            console.log(data)
            res.redirect('/sellers/' + SellerId)
        }).catch(err => {
            console.log(err)
            res.send(err)
        })
    }

    static getLogin(req, res, next) {
        let errors = req.query.error
        if (req.session.isLogin) {
            res.redirect(`/sellers/${req.session.userId}`)
        } else {
            res.render('login', { errors })
        }
    }

    static postLogin(req, res) {
        const {username, password} = req.body
        if (!username || !password) {
            res.redirect('/sellers/login?error=Isi username dan password dengan benar')
        } else {
            Seller.findOne({
                where: {
                    name: username
                }
            }).then(data => {
                if (data) {
                    let passwordDb = data.password
                    let sellerId = data.id
                    let comparing = bcrypt.compareSync(password, passwordDb)
                    if (comparing) {
                        req.session.isLogin = true
                        req.session.userId = sellerId
                        res.redirect('/sellers/' + sellerId)
                    } else {
                        res.redirect('/sellers/login?error=username/password salah')
                    }
                } else {
                    res.redirect('/sellers/login?error=username/password tidak ditemukan')
                }
            }).catch(err => {
                res.send(err)
            })
        }
    }

    static getRegister(req, res) {
        let isLogin = req.session.isLogin
        if (!isLogin) {
            let errors = req.query.error
            if(errors) {
                res.render('register', {errors})
            } else {
                res.render('register', {errors: undefined})
            }
        } else {
            res.redirect(`/sellers/${req.session.userId}`)
        }
    }

    static postRegister(req, res) {
        const {username, password, password1} = req.body
        if (password !== password1) res.redirect('/sellers/register?error=pastikan password sudah benar')
        Seller.create({
            name: username,
            password: password
        }).then(seller => {
            res.redirect(`/sellers/${seller.id}/add-profile`)
        }).catch(err => {
            let error = err
            if (err.errors) {
                error = err.errors.map(e => e.message)
            }
            res.redirect(`/sellers/register?error=${error}`)
        })
    }

    static getAddProfile(req, res) {
        const sellerId = req.params.id
        let errors = req.query.error
        res.render('add-profile', { errors, sellerId })
    }

    static postAddProfile(req, res) {
        const sellerId = req.params.id
        const { fullName, dateOfBirth, address, phone, email, imageUrl } = req.body
        Profile.create({
            fullName: fullName,
            dateOfBirth: dateOfBirth,
            address: address,
            phone: phone,
            email: email,
            imageUrl: imageUrl,
            SellerId: sellerId
        }).then( _ => {
            res.redirect('/sellers/login')
        }).catch(err => {
            if(err.errors) {
                err = err.errors.map(e => e.message)
            }
            res.redirect(`/sellers/${sellerId}/add-profile?error=${err}`)
        })
    }

    static getAddCategory(req, res) {
        const sellerId = req.params.id
        res.render('add-category', {sellerId})
    }

    static postAddCategory(req, res) {
        const sellerId = req.params.id
        const {name} = req.body
        const createdAt = new Date()
        const updatedAt = new Date()
        
        Category.create({
            name,
            createdAt,
            updatedAt
        }).then( _ => {
            res.redirect('/sellers/' + sellerId)
        }).catch(err => {
            res.send(err)
        })
    }

    static getAddProduct(req, res) {
        const sellerId = req.params.id
        Category.findAll({})
            .then(categories => {
                res.render('add-product', { categories, sellerId })
            })
            .catch(err => {
                res.send(err)
            })
    }
    
    static postAddProduct(req, res) {
        const SellerId = req.params.id
        const {name, CategoryId, price, stock, description, imageUrl, videoUrl, weight} = req.body
        Product.create({
            name,
            CategoryId,
            price,
            stock,
            weight,
            videoUrl,
            imageUrl,
            description,
            SellerId
        }).then(data => {
            res.redirect('/sellers/' + SellerId)
        }).catch(err => {
            res.send(err)
        })
    }

    static logout(req, res) {
        req.session.destroy(() => {
            res.redirect('sellers/login')
        })
    }

    static showProfile(req, res) {
        const id = req.params.id

        Profile.findOne({
            where: {
                SellerId: id
            }
        }).then(data => {
            res.render('show-profile', {user: data, sellerId: id})
        }).catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller