const express = require('express')
const router = express.Router();
router.use(express.json())

const promotions = [
    {id: 1, name: '10% Discount on Kitkat'},
    {id: 2, name: '5% Discount on Sneakers'},
    {id: 3, name: 'Buy 100, Get 5 free on Mars'},
    {id: 4, name: 'Sorry ,no discount avaialable'}
]

router.get('/', (req, res) => {
    res.send(promotions)
})
router.get('/:id', (req, res) => {
    const promo = promotions.find(d => d.id === parseInt(req.params.id))
    if (!promo) res.status(404).send('The promotion with given id was not found..!')
    else res.send(promo)
})
router.post('/', (req, res) => {

    const result = validateDish(req.body)
    // console.log(result)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    const promo = {
        id: promotions.length + 1,
        name: req.body.name
    }
    promotions.push(promo)
    res.send(promo)
})
router.put('/:id', (req, res) => {
    const promo = promotions.find(d => d.id === parseInt(req.params.id))
    if (!promo) {
        res.status(404).send('The Promotion with given id was not found..!')
        return
    }

    const result = validateDish(req.body)
    // console.log(result)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    promo.name = req.body.name
    res.send(promo)

})
router.delete('/:id', (req, res) => {
    const promo = promotions.find(d => d.id === parseInt(req.params.id))
    if (!promo) {
        res.status(404).send('The Promotion with given id was not found..!')
        return
    }

    const index = promotions.indexOf(promo)
    promotions.splice(index, 1)

    res.send(promo)

})


module.exports = router