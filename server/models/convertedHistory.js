const mongoose = require('mongoose')

//schema for the database collections

const convertedHistorySchema = mongoose.Schema({
    fromCurrency:{
        type:String,
        required: true
    },
    fromAmount:{
        type:String, 
        required:true
    },
    toCurrency:{
        type:String,
        required: true
    },
    toAmount:{
        type: String,
        required: true
    },
    operatingTime:{
        type: String,
        reuired: true
    }
})

module.exports = mongoose.model('convertedHistory',convertedHistorySchema)