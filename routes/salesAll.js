var express = require('express');
var router = express.Router();
const Collection = require('../models/Collection.model')
const Nft = require('../models/Nft.model')
const Transaction = require('../models/Transaction.model')
const axios = require('axios')


/* GET users listing. */

// THIRTY MINTUES
router.get('/thirtyMinutes', async (req, res) => {
    let currentTimestamp = Math.floor(Date.now()/1000)
    //let currentTimestamp = 1677958278
    const date = new Date(currentTimestamp * 1000); // Convert Unix timestamp to JavaScript Date object
    const minutes = date.getMinutes();
    const roundedMinutes = minutes - (minutes % 30); // Round down to nearest 30 minutes
    date.setMinutes(roundedMinutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    let roundedThirty = Math.floor(date.getTime() / 1000);
    let passThirty = roundedThirty - 1800
    console.log("ROUNDED THIRTY:",roundedThirty);
    console.log("PASS THIRTY:",passThirty);
    let newArr = [];

    await Transaction.find({transactionTimeStamp: {$gte: passThirty ,$lt: roundedThirty}})
        .sort({salePriceUSD: -1})
        .populate('nftTokenObject')
        .then((foundTransactions) => {
            console.log("LENGTH:",foundTransactions.length)
            foundTransactions.forEach((tran) => {
                newArr.push(tran);
            })
            //console.log(newArr);
        })
        .catch((err) => {
            console.log(err);
        })

    //console.log(newArr);
    res.json(newArr);
});













// ONE HOUR

router.get('/hour', async (req, res) => {
    let currentTimestamp = Math.floor(Date.now()/1000)
    //let currentTimestamp = 1677958278
    const date = new Date(currentTimestamp * 1000); // Convert Unix timestamp to JavaScript Date object
    const minutes = date.getMinutes();
    const roundedMinutes = minutes - (minutes % 30); // Round down to nearest 30 minutes
    date.setMinutes(roundedMinutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    let roundedThirty = Math.floor(date.getTime() / 1000);
    let passHour = roundedThirty - 3600
    console.log("ROUNDED THIRTY:",roundedThirty);
    console.log("PASS HOUR:",passHour);
    let newArr = [];

    await Transaction.find({transactionTimeStamp: {$gte: passHour ,$lt: roundedThirty}})
        .sort({salePriceUSD: -1})
        .populate('nftTokenObject')
        .then((foundTransactions) => {
            console.log("LENGTH:",foundTransactions.length)
            foundTransactions.forEach((tran) => {
                newArr.push(tran);
            })
            //console.log(newArr);
        })
        .catch((err) => {
            console.log(err);
        })

    //console.log(newArr);
    res.json(newArr);
});













// ONE DAY

router.get('/oneDay', async (req, res) => {
    let currentTimestamp = Math.floor(Date.now()/1000)
    //let currentTimestamp = 1677958278
    const date = new Date(currentTimestamp * 1000); // Convert Unix timestamp to JavaScript Date object
    const minutes = date.getMinutes();
    const roundedMinutes = minutes - (minutes % 30); // Round down to nearest 30 minutes
    date.setMinutes(roundedMinutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    let roundedThirty = Math.floor(date.getTime() / 1000);
    let passDay = roundedThirty - 86400
    console.log("ROUNDED THIRTY:",roundedThirty);
    console.log("PASS DAY:",passDay);
    let newArr = [];

    await Transaction.find({transactionTimeStamp: {$gte: passDay ,$lt: roundedThirty}})
        .sort({salePriceUSD: -1})
        .populate('nftTokenObject')
        .then((foundTransactions) => {
            console.log("LENGTH:",foundTransactions.length)
            foundTransactions.forEach((tran) => {
                newArr.push(tran);
            })
            //console.log(newArr);
        })
        .catch((err) => {
            console.log(err);
        })

    res.json(newArr);
});













// THREE DAY

router.get('/threeDay', async (req, res) => {
        let currentTimestamp = Math.floor(Date.now()/1000)
        //let currentTimestamp = 1677958278
        const date = new Date(currentTimestamp * 1000); // Convert Unix timestamp to JavaScript Date object
        const minutes = date.getMinutes();
        const roundedMinutes = minutes - (minutes % 30); // Round down to nearest 30 minutes
        date.setMinutes(roundedMinutes);
        date.setSeconds(0);
        date.setMilliseconds(0);
        let roundedThirty = Math.floor(date.getTime() / 1000);
        let passThreeDay = roundedThirty - 259200
        console.log("ROUNDED THIRTY:",roundedThirty);
        console.log("PASS THREE DAY:",passThreeDay);
        let newArr = [];

        await Transaction.find({transactionTimeStamp: {$gte: passThreeDay ,$lt: roundedThirty}})
            .sort({salePriceUSD: -1})
            .populate('nftTokenObject')
            .then((foundTransactions) => {
                console.log("LENGTH:",foundTransactions.length)
                foundTransactions.forEach((tran) => {
                    newArr.push(tran);
                })
                //console.log(newArr);
            })
            .catch((err) => {
                console.log(err);
            })

        res.json(newArr);
});













// SEVEN DAY

router.get('/sevenDay', async (req, res) => {
    let currentTimestamp = Math.floor(Date.now()/1000)
    //let currentTimestamp = 1677958278
    const date = new Date(currentTimestamp * 1000); // Convert Unix timestamp to JavaScript Date object
    const minutes = date.getMinutes();
    const roundedMinutes = minutes - (minutes % 30); // Round down to nearest 30 minutes
    date.setMinutes(roundedMinutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    let roundedThirty = Math.floor(date.getTime() / 1000);
    let passWeek = roundedThirty - 604800
    console.log("ROUNDED THIRTY:",roundedThirty);
    console.log("PASS SEVEN DAY:",passWeek);
    let newArr = [];

    await Transaction.find({transactionTimeStamp: {$gte: passWeek ,$lt: roundedThirty}})
        .sort({salePriceUSD: -1})
        .populate('nftTokenObject')
        .then((foundTransactions) => {
            console.log("LENGTH:",foundTransactions.length)
            foundTransactions.forEach((tran) => {
                newArr.push(tran);
            })
            //console.log(newArr);
        })
        .catch((err) => {
            console.log(err);
        })

    res.json(newArr);
});

module.exports = router;