const houses = require('./db.json')
let houseId = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },
    deleteHouse: (req, res) => {
        const { id } = req.params
        const idx = houses.findIndex(element => element.id === +id)
        if (idx >= 0) {
            houses.splice(idx, 1)
            res.status(200).send(houses)
        } else {
            res.sendStatus(400)
        }
    },
    createHouse: (req, res) => {
        const { address, price, imageURL } = req.body
        if (!address || !price ||!imageURL) {
            res.sendStatus(400)
        }
        const copy = {...req.body, id: houseId}
        houses.push(copy)
        houseId++
        res.status(200).send(houses)
    },
    updateHouse: (req, res) => {
        const { id } = req.params
        const { type } = req.body
        const idx = houses.findIndex(element => element.id === +id)
        if (type === 'plus') {
            houses[idx].price += 10000
            res.status(200).send(houses)
        } else {
            if (houses[idx].price >= 10000) {
                houses[idx].price -= 10000
                res.status(200).send(houses)
            }
        }
    }
}