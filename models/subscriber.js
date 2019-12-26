//import mongoose
const mongoose = require('mongoose')

//create a schema (what the data is)
const subscriberScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },  
    subscriberToChannel: {
        type: String,
        required: true
    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

// Export
module.exports = mongoose.model('subscriber', subscriberScheme)