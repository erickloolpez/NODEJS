
const express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{
    res.send('You are in categories')
})


router.get('/categories/:categoryID/products/:productID', (req, res) => {
    const { categoryID, productID } = req.params
    res.json({
        name: 'Clothes',
        categoryID,
        productID,
    })

})

module.exports = router