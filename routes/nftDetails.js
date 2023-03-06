var express = require('express');
var router = express.Router();
const Collection = require('../models/Collection.model')
const Nft = require('../models/Nft.model')
const Transaction = require('../models/Transaction.model')
const axios = require('axios')


/* GET users listing. */

// nftName and TokenId will be sent in the get request in the frontend using ${}
router.get('/:collectionAddress/:tokenId', (req, res) => {
    Nft.find({collectionAddress: req.params.collectionAddress, tokenId: req.params.tokenId})
    .populate('transactions')
    .then((foundNft) => {
        res.json(foundNft)
    })
    .catch((err) => {
        console.log(err);
    })
});

module.exports = router;
