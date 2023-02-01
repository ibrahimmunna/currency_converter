const router = require('express').Router()

//schema for saving currecy convert details
const convertedHistory = require('./models/convertedHistory')


//saving new entry in the database if the entry has a valid value
router.post('/savenewentry', async (req, res) => {
    if (req.body.toAmount > 0 ) {
        //object for the new saving entry
        let conversionDetails = new convertedHistory({
            fromCurrency: req.body.fromCurrency,
            fromAmount: req.body.fromAmount,
            toCurrency: req.body.toCurrency,
            toAmount: req.body.toAmount,
            operatingTime: req.body.operationTime
        })
        //saving to DB and sending response back
        try {
            await conversionDetails.save()
            res.sendStatus(200)
        }
        catch (error) {
            console.log(error)
        }
    }
})

router.get('/savedentries', async (req, res) => {
    //get the last 10 saved entries and send it as a response
    const savedEntries = await convertedHistory.find({}).sort({$natural:-1}).limit(10)
    res.send(savedEntries)

})

module.exports = router