//Import Express and use express router
const express = require('express')
const router = express.Router()

//Import subscriber model
const Subscriber = require('../models/subscriber')

//Getting all, uses async 
router.get('/', async (req, res) => {
    try{
        const subscribers = await Subscriber.find()
        res.send(subscribers)
    }catch(err) {
        res.status(500).json({ message: err.message})
    }
})

//Getting one
router.get('/:id', getSubscriber, (req, res) => {
    req.json(subscriber)
})

//Creating one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscriberToChannel: req.body.subscriberToChannel ,
    })
    try {
        const newSubsriber = await subscriber.save()
        res.status(201).json(newSubsriber)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//Updating one
router.patch('/:id', getSubscriber, async (req, res) => {
    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscriberToChannel != null){
        res.subscriber.subscriberToChannel = req.body.subscriberToChannel
    }

    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//Deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({message: "Deleted Subscriber"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})

async function getSubscriber(req, res, next){
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null){
            return res.status(404).json({message: 'Cannot find subscriber'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.subscriber = subscriber
    next()
}

//export
module.exports = router