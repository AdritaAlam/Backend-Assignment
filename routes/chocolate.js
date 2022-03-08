const express = require('express')
const router = express.Router();
router.use(express.json())

const chocolate = [
    {id: 1, name: 'Kitkat'},
    {id: 2, name: 'Sneakers'},
    {id: 3, name: 'Mars'},
    {id: 4, name: 'Dairy Milk Silk'}

]

router.get('/', (req, res) => {
    res.send(chocolate)
})
router.get('/:id', (req, res) => {
    const dish = chocolate.find(d => d.id === parseInt(req.params.id))
    if (!dish) res.status(404).send('The item with given id was not found..!')
    else res.send(dish)
})
router.post('/', (req, res) => {

    const result = req.body
    // console.log(result)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    const dish = {
        id: chocolate.length + 1,
        name: req.body.name
    }
    chocolate.push(dish)
    res.send(dish)
})
router.put('/:id', (req, res) => {
    const dish = chocolate.find(d => d.id === parseInt(req.params.id))
    if (!dish) {
        res.status(404).send('The item with given id was not found..!')
        return
    }

    const result = req.body
    // console.log(result)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    dish.name = req.body.name
    res.send(dish)

})
router.delete('/:id', (req, res) => {
    const dish = chocolate.find(d => d.id === parseInt(req.params.id))
    if (!dish) {
        res.status(404).send('The item with given id was not found..!')
        return
    }

    const index = chocolate.indexOf(dish)
    chocolate.splice(index, 1)

    res.send(dish)

})

module.exports = router