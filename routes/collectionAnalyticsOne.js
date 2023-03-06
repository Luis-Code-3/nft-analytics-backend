var express = require('express');
var router = express.Router();
const Collection = require('../models/Collection.model')
const Nft = require('../models/Nft.model')
const Transaction = require('../models/Transaction.model')
const axios = require('axios');
const { collection } = require('../models/Collection.model');

// IMPORT CURRENT ETH PRICE AND ALL COLLECTION FLOOR PRICES


// CollectionAddress will be sent in the get request in the frontend using ${}

// 30 MINUTES
router.get('/:collectionAddress/thirtyMinutes', async (req, res) => {

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

    let collectionTransactions = [];
    let foundCollectionDetails = {};
    let collectionFloorPrice = 0;

    await Collection.find({contractAddress: req.params.collectionAddress})
    .then((foundCollection) => {
        foundCollectionDetails = foundCollection;
    })
    .catch((err) => {
        console.log(err);
    })


    await Transaction.find({collectionAddress: req.params.collectionAddress, transactionTimeStamp: {$gte: passThirty ,$lt: roundedThirty}})
    .sort({transactionTimeStamp: -1})
    .then((foundTrans) => {
        foundTrans.forEach((tran) => {
            collectionTransactions.push(tran)
        })
    })
    .catch((err) => {
        console.log(err);
    })

    if (req.params.collectionAddress === '0xed5af388653567af2f388e6224dc7c4b3241c544') {
        collectionFloorPrice = azukiFloorPrice;
    } else if (req.params.collectionAddress === '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d') {
        collectionFloorPrice = boredApeFloorPrice;
    } else if (req.params.collectionAddress === '0xba30e5f9bb24caa003e9f2f0497ad287fdf95623') {
        collectionFloorPrice = boredDogFloorPrice;
    } else if (req.params.collectionAddress === '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e') {
        collectionFloorPrice = doodleFloorPrice;
    } else if (req.params.collectionAddress === '0x23581767a106ae21c074b2276d25e5c3e136a68b') {
        collectionFloorPrice = moonbirdFloorPrice;
    } else if (req.params.collectionAddress === '0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d') {
        collectionFloorPrice = onforceFloorPrice;
    } else if (req.params.collectionAddress === '0x1a92f7381b9f03921564a437210bb9396471050c') {
        collectionFloorPrice = coolcatFloorPrice;
    } else if (req.params.collectionAddress === '0xbd3531da5cf5857e7cfaa92426877b022e612cf8') {
        collectionFloorPrice = penguinFloorPrice;
    } else {
        console.log("collection not found");
    }

    // COLLECTION OBJECT TO PASS BACK TO FRONTEND

    let collectionObject = {
        collectionName: foundCollectionDetails[0].collectionName,
        collectionLogo: foundCollectionDetails[0].logoUrl,
        collectionAddress: foundCollectionDetails[0].contractAddress,
        tokenSupply: foundCollectionDetails[0].tokenSupply,
        floorPrice: collectionFloorPrice,
        marketCapEth: 0,
        marketCapUsd: 0,
        totalSales: collectionTransactions.length,
        averageSalePriceEth: 0,
        averageSalePriceUsd: 0,
        volumeEth: 0,
        volumeUsd: 0
    }

    collectionTransactions.forEach((tran) => {
        collectionObject.volumeEth += tran.salePriceEth
        collectionObject.volumeUsd += tran.salePriceUSD;
    })

    collectionObject.volumeEth = Number((collectionObject.volumeEth).toFixed(2));
    collectionObject.averageSalePriceEth = Number((collectionObject.volumeEth / collectionTransactions.length).toFixed(2))
    collectionObject.averageSalePriceUsd = Number((collectionObject.volumeUsd / collectionTransactions.length).toFixed(2))
    collectionObject.marketCapEth = Math.round(Number(collectionObject.tokenSupply.replaceAll(',','')) * collectionFloorPrice)
    collectionObject.marketCapUsd = Math.round(collectionObject.marketCapEth * currentEthereumPrice)

    // renders
    res.json(collectionObject)

});












// 1 HOUR

router.get('/:collectionAddress/hour', async (req, res) => {

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

    let collectionTransactions = [];
    let foundCollectionDetails = {};
    let collectionFloorPrice = 0;

    await Collection.find({contractAddress: req.params.collectionAddress})
    .then((foundCollection) => {
        foundCollectionDetails = foundCollection;
    })
    .catch((err) => {
        console.log(err);
    })


    await Transaction.find({collectionAddress: req.params.collectionAddress, transactionTimeStamp: {$gte: passHour ,$lt: roundedThirty}})
    .sort({transactionTimeStamp: -1})
    .then((foundTrans) => {
        foundTrans.forEach((tran) => {
            collectionTransactions.push(tran)
        })
    })
    .catch((err) => {
        console.log(err);
    })

    if (req.params.collectionAddress === '0xed5af388653567af2f388e6224dc7c4b3241c544') {
        collectionFloorPrice = azukiFloorPrice;
    } else if (req.params.collectionAddress === '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d') {
        collectionFloorPrice = boredApeFloorPrice;
    } else if (req.params.collectionAddress === '0xba30e5f9bb24caa003e9f2f0497ad287fdf95623') {
        collectionFloorPrice = boredDogFloorPrice;
    } else if (req.params.collectionAddress === '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e') {
        collectionFloorPrice = doodleFloorPrice;
    } else if (req.params.collectionAddress === '0x23581767a106ae21c074b2276d25e5c3e136a68b') {
        collectionFloorPrice = moonbirdFloorPrice;
    } else if (req.params.collectionAddress === '0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d') {
        collectionFloorPrice = onforceFloorPrice;
    } else if (req.params.collectionAddress === '0x1a92f7381b9f03921564a437210bb9396471050c') {
        collectionFloorPrice = coolcatFloorPrice;
    } else if (req.params.collectionAddress === '0xbd3531da5cf5857e7cfaa92426877b022e612cf8') {
        collectionFloorPrice = penguinFloorPrice;
    } else {
        console.log("collection not found");
    }

    // COLLECTION OBJECT TO PASS BACK TO FRONTEND

    let collectionObject = {
        collectionName: foundCollectionDetails[0].collectionName,
        collectionLogo: foundCollectionDetails[0].logoUrl,
        collectionAddress: foundCollectionDetails[0].contractAddress,
        tokenSupply: foundCollectionDetails[0].tokenSupply,
        floorPrice: collectionFloorPrice,
        marketCapEth: 0,
        marketCapUsd: 0,
        totalSales: collectionTransactions.length,
        averageSalePriceEth: 0,
        averageSalePriceUsd: 0,
        volumeEth: 0,
        volumeUsd: 0
    }

    collectionTransactions.forEach((tran) => {
        collectionObject.volumeEth += tran.salePriceEth
        collectionObject.volumeUsd += tran.salePriceUSD;
    })

    collectionObject.volumeEth = Number((collectionObject.volumeEth).toFixed(2));
    collectionObject.averageSalePriceEth = Number((collectionObject.volumeEth / collectionTransactions.length).toFixed(2))
    collectionObject.averageSalePriceUsd = Number((collectionObject.volumeUsd / collectionTransactions.length).toFixed(2))
    collectionObject.marketCapEth = Math.round(Number(collectionObject.tokenSupply.replaceAll(',','')) * collectionFloorPrice)
    collectionObject.marketCapUsd = Math.round(collectionObject.marketCapEth * currentEthereumPrice)

    // renders
    res.json(collectionObject)

});













// 1 DAY

router.get('/:collectionAddress/oneDay', async (req, res) => {

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

    let collectionTransactions = [];
    let foundCollectionDetails = {};
    let collectionFloorPrice = 0;

    await Collection.find({contractAddress: req.params.collectionAddress})
    .then((foundCollection) => {
        foundCollectionDetails = foundCollection;
    })
    .catch((err) => {
        console.log(err);
    })


    await Transaction.find({collectionAddress: req.params.collectionAddress, transactionTimeStamp: {$gte: passDay ,$lt: roundedThirty}})
    .sort({transactionTimeStamp: -1})
    .then((foundTrans) => {
        foundTrans.forEach((tran) => {
            collectionTransactions.push(tran)
        })
    })
    .catch((err) => {
        console.log(err);
    })

    if (req.params.collectionAddress === '0xed5af388653567af2f388e6224dc7c4b3241c544') {
        collectionFloorPrice = azukiFloorPrice;
    } else if (req.params.collectionAddress === '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d') {
        collectionFloorPrice = boredApeFloorPrice;
    } else if (req.params.collectionAddress === '0xba30e5f9bb24caa003e9f2f0497ad287fdf95623') {
        collectionFloorPrice = boredDogFloorPrice;
    } else if (req.params.collectionAddress === '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e') {
        collectionFloorPrice = doodleFloorPrice;
    } else if (req.params.collectionAddress === '0x23581767a106ae21c074b2276d25e5c3e136a68b') {
        collectionFloorPrice = moonbirdFloorPrice;
    } else if (req.params.collectionAddress === '0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d') {
        collectionFloorPrice = onforceFloorPrice;
    } else if (req.params.collectionAddress === '0x1a92f7381b9f03921564a437210bb9396471050c') {
        collectionFloorPrice = coolcatFloorPrice;
    } else if (req.params.collectionAddress === '0xbd3531da5cf5857e7cfaa92426877b022e612cf8') {
        collectionFloorPrice = penguinFloorPrice;
    } else {
        console.log("collection not found");
    }

    // COLLECTION OBJECT TO PASS BACK TO FRONTEND

    let collectionObject = {
        collectionName: foundCollectionDetails[0].collectionName,
        collectionLogo: foundCollectionDetails[0].logoUrl,
        collectionAddress: foundCollectionDetails[0].contractAddress,
        tokenSupply: foundCollectionDetails[0].tokenSupply,
        floorPrice: collectionFloorPrice,
        marketCapEth: 0,
        marketCapUsd: 0,
        totalSales: collectionTransactions.length,
        averageSalePriceEth: 0,
        averageSalePriceUsd: 0,
        volumeEth: 0,
        volumeUsd: 0
    }

    collectionTransactions.forEach((tran) => {
        collectionObject.volumeEth += tran.salePriceEth
        collectionObject.volumeUsd += tran.salePriceUSD;
    })

    collectionObject.volumeEth = Number((collectionObject.volumeEth).toFixed(2));
    collectionObject.averageSalePriceEth = Number((collectionObject.volumeEth / collectionTransactions.length).toFixed(2))
    collectionObject.averageSalePriceUsd = Number((collectionObject.volumeUsd / collectionTransactions.length).toFixed(2))
    collectionObject.marketCapEth = Math.round(Number(collectionObject.tokenSupply.replaceAll(',','')) * collectionFloorPrice)
    collectionObject.marketCapUsd = Math.round(collectionObject.marketCapEth * currentEthereumPrice)

    // renders
    res.json(collectionObject)

});













// 3 DAY

router.get('/:collectionAddress/threeDay', async (req, res) => {

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

    let collectionTransactions = [];
    let foundCollectionDetails = {};
    let collectionFloorPrice = 0;

    await Collection.find({contractAddress: req.params.collectionAddress})
    .then((foundCollection) => {
        foundCollectionDetails = foundCollection;
    })
    .catch((err) => {
        console.log(err);
    })


    await Transaction.find({collectionAddress: req.params.collectionAddress, transactionTimeStamp: {$gte: passThreeDay ,$lt: roundedThirty}})
    .sort({transactionTimeStamp: -1})
    .then((foundTrans) => {
        foundTrans.forEach((tran) => {
            collectionTransactions.push(tran)
        })
    })
    .catch((err) => {
        console.log(err);
    })

    if (req.params.collectionAddress === '0xed5af388653567af2f388e6224dc7c4b3241c544') {
        collectionFloorPrice = azukiFloorPrice;
    } else if (req.params.collectionAddress === '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d') {
        collectionFloorPrice = boredApeFloorPrice;
    } else if (req.params.collectionAddress === '0xba30e5f9bb24caa003e9f2f0497ad287fdf95623') {
        collectionFloorPrice = boredDogFloorPrice;
    } else if (req.params.collectionAddress === '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e') {
        collectionFloorPrice = doodleFloorPrice;
    } else if (req.params.collectionAddress === '0x23581767a106ae21c074b2276d25e5c3e136a68b') {
        collectionFloorPrice = moonbirdFloorPrice;
    } else if (req.params.collectionAddress === '0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d') {
        collectionFloorPrice = onforceFloorPrice;
    } else if (req.params.collectionAddress === '0x1a92f7381b9f03921564a437210bb9396471050c') {
        collectionFloorPrice = coolcatFloorPrice;
    } else if (req.params.collectionAddress === '0xbd3531da5cf5857e7cfaa92426877b022e612cf8') {
        collectionFloorPrice = penguinFloorPrice;
    } else {
        console.log("collection not found");
    }

    // COLLECTION OBJECT TO PASS BACK TO FRONTEND

    let collectionObject = {
        collectionName: foundCollectionDetails[0].collectionName,
        collectionLogo: foundCollectionDetails[0].logoUrl,
        collectionAddress: foundCollectionDetails[0].contractAddress,
        tokenSupply: foundCollectionDetails[0].tokenSupply,
        floorPrice: collectionFloorPrice,
        marketCapEth: 0,
        marketCapUsd: 0,
        totalSales: collectionTransactions.length,
        averageSalePriceEth: 0,
        averageSalePriceUsd: 0,
        volumeEth: 0,
        volumeUsd: 0
    }

    collectionTransactions.forEach((tran) => {
        collectionObject.volumeEth += tran.salePriceEth
        collectionObject.volumeUsd += tran.salePriceUSD;
    })

    collectionObject.volumeEth = Number((collectionObject.volumeEth).toFixed(2));
    collectionObject.averageSalePriceEth = Number((collectionObject.volumeEth / collectionTransactions.length).toFixed(2))
    collectionObject.averageSalePriceUsd = Number((collectionObject.volumeUsd / collectionTransactions.length).toFixed(2))
    collectionObject.marketCapEth = Math.round(Number(collectionObject.tokenSupply.replaceAll(',','')) * collectionFloorPrice)
    collectionObject.marketCapUsd = Math.round(collectionObject.marketCapEth * currentEthereumPrice)

    // renders
    res.json(collectionObject)

});













// 7 DAY

router.get('/:collectionAddress/sevenDay', async (req, res) => {

    let currentTimestamp = Math.floor(Date.now()/1000)
    //let currentTimestamp = 1677958278
    const date = new Date(currentTimestamp * 1000); // Convert Unix timestamp to JavaScript Date object
    const minutes = date.getMinutes();
    const roundedMinutes = minutes - (minutes % 30); // Round down to nearest 30 minutes
    date.setMinutes(roundedMinutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    let roundedThirty = Math.floor(date.getTime() / 1000);
    let passSevenDay = roundedThirty - 604800
    console.log("ROUNDED THIRTY:",roundedThirty);
    console.log("PASS SEVEN DAY:",passSevenDay);

    let collectionTransactions = [];
    let foundCollectionDetails = {};
    let collectionFloorPrice = 0;

    await Collection.find({contractAddress: req.params.collectionAddress})
    .then((foundCollection) => {
        foundCollectionDetails = foundCollection;
    })
    .catch((err) => {
        console.log(err);
    })


    await Transaction.find({collectionAddress: req.params.collectionAddress, transactionTimeStamp: {$gte: passSevenDay ,$lt: roundedThirty}})
    .sort({transactionTimeStamp: -1})
    .then((foundTrans) => {
        foundTrans.forEach((tran) => {
            collectionTransactions.push(tran)
        })
    })
    .catch((err) => {
        console.log(err);
    })

    if (req.params.collectionAddress === '0xed5af388653567af2f388e6224dc7c4b3241c544') {
        collectionFloorPrice = azukiFloorPrice;
    } else if (req.params.collectionAddress === '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d') {
        collectionFloorPrice = boredApeFloorPrice;
    } else if (req.params.collectionAddress === '0xba30e5f9bb24caa003e9f2f0497ad287fdf95623') {
        collectionFloorPrice = boredDogFloorPrice;
    } else if (req.params.collectionAddress === '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e') {
        collectionFloorPrice = doodleFloorPrice;
    } else if (req.params.collectionAddress === '0x23581767a106ae21c074b2276d25e5c3e136a68b') {
        collectionFloorPrice = moonbirdFloorPrice;
    } else if (req.params.collectionAddress === '0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d') {
        collectionFloorPrice = onforceFloorPrice;
    } else if (req.params.collectionAddress === '0x1a92f7381b9f03921564a437210bb9396471050c') {
        collectionFloorPrice = coolcatFloorPrice;
    } else if (req.params.collectionAddress === '0xbd3531da5cf5857e7cfaa92426877b022e612cf8') {
        collectionFloorPrice = penguinFloorPrice;
    } else {
        console.log("collection not found");
    }

    // COLLECTION OBJECT TO PASS BACK TO FRONTEND

    let collectionObject = {
        collectionName: foundCollectionDetails[0].collectionName,
        collectionLogo: foundCollectionDetails[0].logoUrl,
        collectionAddress: foundCollectionDetails[0].contractAddress,
        tokenSupply: foundCollectionDetails[0].tokenSupply,
        floorPrice: collectionFloorPrice,
        marketCapEth: 0,
        marketCapUsd: 0,
        totalSales: collectionTransactions.length,
        averageSalePriceEth: 0,
        averageSalePriceUsd: 0,
        volumeEth: 0,
        volumeUsd: 0
    }

    collectionTransactions.forEach((tran) => {
        collectionObject.volumeEth += tran.salePriceEth
        collectionObject.volumeUsd += tran.salePriceUSD;
    })

    collectionObject.volumeEth = Number((collectionObject.volumeEth).toFixed(2));
    collectionObject.averageSalePriceEth = Number((collectionObject.volumeEth / collectionTransactions.length).toFixed(2))
    collectionObject.averageSalePriceUsd = Number((collectionObject.volumeUsd / collectionTransactions.length).toFixed(2))
    collectionObject.marketCapEth = Math.round(Number(collectionObject.tokenSupply.replaceAll(',','')) * collectionFloorPrice)
    collectionObject.marketCapUsd = Math.round(collectionObject.marketCapEth * currentEthereumPrice)

    // renders
    res.json(collectionObject)

});

module.exports = router;