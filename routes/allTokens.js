var express = require('express');
var router = express.Router();
const Collection = require('../models/Collection.model')
const Nft = require('../models/Nft.model')
const Transaction = require('../models/Transaction.model')
const axios = require('axios')


/* GET users listing. */

// collectionAddress will be sent in the get request in the frontend using ${}
// Need this to eventually only return the first 20, then when a button is clicked the next 20
router.get('/:collectionAddress', (req, res) => {
    Nft.find({collectionAddress: req.params.collectionAddress})
    //.populate('transactions')
    .then((foundNfts) => {
        res.json(foundNfts)
    })
    .catch((err) => {
        console.log(err);
    })
});

module.exports = router;