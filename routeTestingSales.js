const Collection = require('./models/Collection.model')
const Nft = require('./models/Nft.model')
const Transaction = require('./models/Transaction.model')
var mongoose = require('mongoose');
const axios = require('axios')
require("dotenv").config();


mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    
    async function thirtySales () {
        // let currentTimestamp = Math.floor(Date.now()/1000)
        let currentTimestamp = 1677958278
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
            //.populate('nftTokenObject')
            .then((foundTransactions) => {
                console.log("LENGTH:",foundTransactions.length)
                foundTransactions.forEach((tran) => {
                    newArr.push(tran.salePriceEth);
                })
                console.log(newArr);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    // 1 HOUR
    async function hourSales () {
        // let currentTimestamp = Math.floor(Date.now()/1000)
        let currentTimestamp = 1677958278
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
            //.populate('nftTokenObject')
            .then((foundTransactions) => {
                console.log("LENGTH:",foundTransactions.length)
                foundTransactions.forEach((tran) => {
                    newArr.push(tran.salePriceEth);
                })
                console.log(newArr);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    // 1 DAY
    async function daySales () {
        // let currentTimestamp = Math.floor(Date.now()/1000)
        let currentTimestamp = 1677958278
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
            //.populate('nftTokenObject')
            .then((foundTransactions) => {
                console.log("LENGTH:",foundTransactions.length)
                foundTransactions.forEach((tran) => {
                    newArr.push(tran.salePriceEth);
                })
                console.log(newArr);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    // 3 DAY
    async function threeDaySales () {
        // let currentTimestamp = Math.floor(Date.now()/1000)
        let currentTimestamp = 1677958278
        const date = new Date(currentTimestamp * 1000); // Convert Unix timestamp to JavaScript Date object
        const minutes = date.getMinutes();
        const roundedMinutes = minutes - (minutes % 30); // Round down to nearest 30 minutes
        date.setMinutes(roundedMinutes);
        date.setSeconds(0);
        date.setMilliseconds(0);
        let roundedThirty = Math.floor(date.getTime() / 1000);
        let passThreeDay = roundedThirty - 259200
        console.log("ROUNDED THIRTY:",roundedThirty);
        console.log("PASS DAY:",passThreeDay);
        let newArr = [];

        await Transaction.find({transactionTimeStamp: {$gte: passThreeDay ,$lt: roundedThirty}})
            .sort({salePriceUSD: -1})
            //.populate('nftTokenObject')
            .then((foundTransactions) => {
                console.log("LENGTH:",foundTransactions.length)
                foundTransactions.forEach((tran) => {
                    newArr.push(tran.salePriceEth);
                })
                console.log(newArr);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    // 7 DAY
    async function sevenDaySales () {
        // let currentTimestamp = Math.floor(Date.now()/1000)
        let currentTimestamp = 1677958278
        const date = new Date(currentTimestamp * 1000); // Convert Unix timestamp to JavaScript Date object
        const minutes = date.getMinutes();
        const roundedMinutes = minutes - (minutes % 30); // Round down to nearest 30 minutes
        date.setMinutes(roundedMinutes);
        date.setSeconds(0);
        date.setMilliseconds(0);
        let roundedThirty = Math.floor(date.getTime() / 1000);
        let passWeek = roundedThirty - 604800
        console.log("ROUNDED THIRTY:",roundedThirty);
        console.log("PASS DAY:",passWeek);
        let newArr = [];

        await Transaction.find({transactionTimeStamp: {$gte: passWeek ,$lt: roundedThirty}})
            .sort({salePriceUSD: -1})
            //.populate('nftTokenObject')
            .then((foundTransactions) => {
                console.log("LENGTH:",foundTransactions.length)
                foundTransactions.forEach((tran) => {
                    newArr.push(tran.salePriceEth);
                })
                console.log(newArr);
            })
            .catch((err) => {
                console.log(err);
            })

    }




  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });