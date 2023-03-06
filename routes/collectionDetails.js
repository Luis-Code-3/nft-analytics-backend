var express = require('express');
var router = express.Router();
const Collection = require('../models/Collection.model')
const Nft = require('../models/Nft.model')
const Transaction = require('../models/Transaction.model')
const axios = require('axios')


/* GET users listing. */

// CollectionName will be sent in the get request in the frontend using ${}
router.get('/:collectionName', (req, res) => {
    Collection.find({collectionName: req.params.collectionName})
    .then((foundCollection) => {
        res.json(foundCollection)
    })
    .catch((err) => {
        console.log(err);
    })
});

module.exports = router;
