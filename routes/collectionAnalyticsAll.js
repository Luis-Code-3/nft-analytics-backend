var express = require('express');
var router = express.Router();
const Collection = require('../models/Collection.model')
const Nft = require('../models/Nft.model')
const Transaction = require('../models/Transaction.model')
const axios = require('axios')
const { returnFloorPriceAndEthPrice } = require('../floorPricesAndEthPrice');


// IMPORT CURRENT ETH PRICE AND ALL COLLECTION FLOOR PRICES
let azukiFloorPrice = 0;
let boredApeFloorPrice = 0;
let boredDogFloorPrice = 0;
let doodleFloorPrice = 0;
let moonbirdFloorPrice = 0;
let onforceFloorPrice = 0;
let coolcatFloorPrice = 0;
let penguinFloorPrice = 0;
let currentEthereumPrice = 0;

function setFloorAndEth() {
    let floorAndEth = returnFloorPriceAndEthPrice();
    azukiFloorPrice = floorAndEth[0];
    boredApeFloorPrice = floorAndEth[1];
    boredDogFloorPrice = floorAndEth[2];
    doodleFloorPrice = floorAndEth[3];
    moonbirdFloorPrice = floorAndEth[4];
    onforceFloorPrice = floorAndEth[5];
    coolcatFloorPrice = floorAndEth[6];
    penguinFloorPrice = floorAndEth[7];
    currentEthereumPrice = floorAndEth[8];
}

// THIRTY MINUTES
router.get('/thirtyMinutes', async (req, res) => {
    setFloorAndEth();
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

    let azukiTransactions = [];
    let BoredApeTransactions = [];
    let BoredDogTransactions = [];
    let CoolCatsTransactions = [];
    let DoodlesTransactions = [];
    let MoonbirdsTransactions = [];
    let OnForceTransactions = [];
    let PenguinTransactions = [];


    await Transaction.find({transactionTimeStamp: {$gte: passThirty ,$lt: roundedThirty}})
    .sort({transactionTimeStamp: -1})
    .then((foundTrans) => {
        foundTrans.forEach((tran) => {
            if (tran.collectionAddress === "0xed5af388653567af2f388e6224dc7c4b3241c544")  {
                azukiTransactions.push(tran)
            } else if (tran.collectionAddress === "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d") {
                BoredApeTransactions.push(tran)
            } else if (tran.collectionAddress === "0xba30e5f9bb24caa003e9f2f0497ad287fdf95623") {
                BoredDogTransactions.push(tran)
            } else if (tran.collectionAddress === "0x1a92f7381b9f03921564a437210bb9396471050c") {
                CoolCatsTransactions.push(tran)
            } else if (tran.collectionAddress === "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e") {
                DoodlesTransactions.push(tran)
            } else if (tran.collectionAddress === "0x23581767a106ae21c074b2276d25e5c3e136a68b") {
                MoonbirdsTransactions.push(tran)
            } else if (tran.collectionAddress === "0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d") {
                OnForceTransactions.push(tran)
            } else if (tran.collectionAddress === "0xbd3531da5cf5857e7cfaa92426877b022e612cf8") {
                PenguinTransactions.push(tran)
            } else {
                console.log("No Collections Match");
            }
        })
    })
    .catch((err) => {
        console.log(err);
    })

    // DOODLES

    let doodleObject = {
        collectionName: 'Doodles',
        collectionLogo: 'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&w=3840',
        collectionAddress: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
        tokenSupply: '10,000',
        floorPrice: doodleFloorPrice,
        floorPriceUSD: Number((doodleFloorPrice * currentEthereumPrice).toFixed(2)),
        marketCapEth: 0,
        marketCapUsd: 0,
        totalSales: DoodlesTransactions.length,
        averageSalePriceEth: 0,
        averageSalePriceUsd: 0,
        volumeEth: 0,
        volumeUsd: 0
    }
    // AZUKI
    let azukiObject = {
        collectionName: 'Azuki',
        collectionLogo: 'https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&w=3840',
        collectionAddress: '0xed5af388653567af2f388e6224dc7c4b3241c544',
        tokenSupply: '10,000',
        floorPrice: azukiFloorPrice,
        floorPriceUSD: Number((azukiFloorPrice * currentEthereumPrice).toFixed(2)),
        marketCapEth: 0,
        marketCapUsd: 0,
        totalSales: azukiTransactions.length,
        averageSalePriceEth: 0,
        averageSalePriceUsd: 0,
        volumeEth: 0,
        volumeUsd: 0
    }
    // BORED APE
    let boredApeObject = {
        collectionName: 'Bored Ape Yacht Club',
        collectionLogo: 'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=3840',
        collectionAddress: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
        tokenSupply: '10,000',
        floorPrice: boredApeFloorPrice,
        floorPriceUSD: Number((boredApeFloorPrice * currentEthereumPrice).toFixed(2)),
        marketCapEth: 0,
        marketCapUsd: 0,
        totalSales: BoredApeTransactions.length,
        averageSalePriceEth: 0,
        averageSalePriceUsd: 0,
        volumeEth: 0,
        volumeUsd: 0
    }
    // BORED DOG
    let boredDogObject = {
        collectionName: 'Bored Ape Kennel Club',
        collectionLogo: 'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=3840',
        collectionAddress: '0xba30e5f9bb24caa003e9f2f0497ad287fdf95623',
        tokenSupply: '9,602',
        floorPrice: boredDogFloorPrice,
        floorPriceUSD: Number((boredDogFloorPrice * currentEthereumPrice).toFixed(2)),
        marketCapEth: 0,
        marketCapUsd: 0,
        totalSales: BoredDogTransactions.length,
        averageSalePriceEth: 0,
        averageSalePriceUsd: 0,
        volumeEth: 0,
        volumeUsd: 0
    }
    // MOONBIRDS
    let moonbirdObject = {
        collectionName: 'Moonbirds',
        collectionLogo: 'https://i.seadn.io/gae/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75?auto=format&w=3840',
        collectionAddress: '0x23581767a106ae21c074b2276d25e5c3e136a68b',
        tokenSupply: '10,000',
        floorPrice: moonbirdFloorPrice,
        floorPriceUSD: Number((moonbirdFloorPrice * currentEthereumPrice).toFixed(2)),
        marketCapEth: 0,
        marketCapUsd: 0,
        totalSales: MoonbirdsTransactions.length,
        averageSalePriceEth: 0,
        averageSalePriceUsd: 0,
        volumeEth: 0,
        volumeUsd: 0
    }
    // ONFORCE
    let onForceObject = {
        collectionName: 'ON1 Force',
        collectionLogo: 'https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?auto=format&w=3840',
        collectionAddress: '0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d',
        tokenSupply: '7,777',
        floorPrice: onforceFloorPrice,
        floorPriceUSD: Number((onforceFloorPrice * currentEthereumPrice).toFixed(2)),
        marketCapEth: 0,
        marketCapUsd: 0,
        totalSales: OnForceTransactions.length,
        averageSalePriceEth: 0,
        averageSalePriceUsd: 0,
        volumeEth: 0,
        volumeUsd: 0
    }
    // COOL CATS
    let coolCatsObject = {
        collectionName: 'Cool Cats',
        collectionLogo: 'https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?auto=format&w=3840',
        collectionAddress: '0x1a92f7381b9f03921564a437210bb9396471050c',
        tokenSupply: '10,000',
        floorPrice: coolcatFloorPrice,
        floorPriceUSD: Number((coolcatFloorPrice * currentEthereumPrice).toFixed(2)),
        marketCapEth: 0,
        marketCapUsd: 0,
        totalSales: CoolCatsTransactions.length,
        averageSalePriceEth: 0,
        averageSalePriceUsd: 0,
        volumeEth: 0,
        volumeUsd: 0
    }
    // PUDGY PENGUINS
    let penguinObject = {
        collectionName: 'Pudgy Penguins',
        collectionLogo: 'https://i.seadn.io/gae/yNi-XdGxsgQCPpqSio4o31ygAV6wURdIdInWRcFIl46UjUQ1eV7BEndGe8L661OoG-clRi7EgInLX4LPu9Jfw4fq0bnVYHqg7RFi?auto=format&w=3840',
        collectionAddress: '0xbd3531da5cf5857e7cfaa92426877b022e612cf8',
        tokenSupply: '10,000',
        floorPrice: penguinFloorPrice,
        floorPriceUSD: Number((penguinFloorPrice * currentEthereumPrice).toFixed(2)),
        marketCapEth: 0,
        marketCapUsd: 0,
        totalSales: PenguinTransactions.length,
        averageSalePriceEth: 0,
        averageSalePriceUsd: 0,
        volumeEth: 0,
        volumeUsd: 0
    }

    DoodlesTransactions.forEach((doodleTran) => {
        doodleObject.volumeEth += doodleTran.salePriceEth
        doodleObject.volumeUsd += doodleTran.salePriceUSD;
    })

    doodleObject.volumeEth = Number((doodleObject.volumeEth).toFixed(2));
    if(DoodlesTransactions.length === 0) {
        doodleObject.averageSalePriceEth = 0
        doodleObject.averageSalePriceUsd = 0
    } else {
        doodleObject.averageSalePriceEth = Number((doodleObject.volumeEth / DoodlesTransactions.length).toFixed(2))
        doodleObject.averageSalePriceUsd = Number((doodleObject.volumeUsd / DoodlesTransactions.length).toFixed(2))
    }
    doodleObject.marketCapEth = Math.round(Number(doodleObject.tokenSupply.replaceAll(',','')) * doodleFloorPrice)
    doodleObject.marketCapUsd = Math.round(doodleObject.marketCapEth * currentEthereumPrice)

    azukiTransactions.forEach((azukiTran) => {
        azukiObject.volumeEth += azukiTran.salePriceEth
        azukiObject.volumeUsd += azukiTran.salePriceUSD;
    })

    azukiObject.volumeEth = Number((azukiObject.volumeEth).toFixed(2));
    if(azukiTransactions.length === 0) {
        azukiObject.averageSalePriceEth = 0
        azukiObject.averageSalePriceUsd = 0
    } else {
        azukiObject.averageSalePriceEth = Number((azukiObject.volumeEth / azukiTransactions.length).toFixed(2))
        azukiObject.averageSalePriceUsd = Number((azukiObject.volumeUsd / azukiTransactions.length).toFixed(2))
    }
    azukiObject.marketCapEth = Math.round(Number(azukiObject.tokenSupply.replaceAll(',','')) * azukiFloorPrice)
    azukiObject.marketCapUsd = Math.round(azukiObject.marketCapEth * currentEthereumPrice)

    BoredApeTransactions.forEach((apeTran) => {
        boredApeObject.volumeEth += apeTran.salePriceEth
        boredApeObject.volumeUsd += apeTran.salePriceUSD;
    })

    boredApeObject.volumeEth = Number((boredApeObject.volumeEth).toFixed(2));
    if(BoredApeTransactions.length === 0) {
        boredApeObject.averageSalePriceEth = 0
        boredApeObject.averageSalePriceUsd = 0
    } else {
        boredApeObject.averageSalePriceEth = Number((boredApeObject.volumeEth / BoredApeTransactions.length).toFixed(2))
        boredApeObject.averageSalePriceUsd = Number((boredApeObject.volumeUsd / BoredApeTransactions.length).toFixed(2))
    }
    boredApeObject.marketCapEth = Math.round(Number(boredApeObject.tokenSupply.replaceAll(',','')) * boredApeFloorPrice)
    boredApeObject.marketCapUsd = Math.round(boredApeObject.marketCapEth * currentEthereumPrice)

    BoredDogTransactions.forEach((dogTran) => {
        boredDogObject.volumeEth += dogTran.salePriceEth
        boredDogObject.volumeUsd += dogTran.salePriceUSD;
    })

    boredDogObject.volumeEth = Number((boredDogObject.volumeEth).toFixed(2));
    if(BoredDogTransactions.length === 0) {
        boredDogObject.averageSalePriceEth = 0
        boredDogObject.averageSalePriceUsd = 0
    } else {
        boredDogObject.averageSalePriceEth = Number((boredDogObject.volumeEth / BoredDogTransactions.length).toFixed(2))
        boredDogObject.averageSalePriceUsd = Number((boredDogObject.volumeUsd / BoredDogTransactions.length).toFixed(2))
    }
    boredDogObject.marketCapEth = Math.round(Number(boredDogObject.tokenSupply.replaceAll(',','')) * boredDogFloorPrice)
    boredDogObject.marketCapUsd = Math.round(boredDogObject.marketCapEth * currentEthereumPrice)

    MoonbirdsTransactions.forEach((birdTran) => {
        moonbirdObject.volumeEth += birdTran.salePriceEth
        moonbirdObject.volumeUsd += birdTran.salePriceUSD;
    })

    moonbirdObject.volumeEth = Number((moonbirdObject.volumeEth).toFixed(2));
    if(MoonbirdsTransactions.length === 0) {
        moonbirdObject.averageSalePriceEth = 0
        moonbirdObject.averageSalePriceUsd = 0
    } else {
        moonbirdObject.averageSalePriceEth = Number((moonbirdObject.volumeEth / MoonbirdsTransactions.length).toFixed(2))
        moonbirdObject.averageSalePriceUsd = Number((moonbirdObject.volumeUsd / MoonbirdsTransactions.length).toFixed(2))
    }
    moonbirdObject.marketCapEth = Math.round(Number(moonbirdObject.tokenSupply.replaceAll(',','')) * moonbirdFloorPrice)
    moonbirdObject.marketCapUsd = Math.round(moonbirdObject.marketCapEth * currentEthereumPrice)

    OnForceTransactions.forEach((onForceTran) => {
        onForceObject.volumeEth += onForceTran.salePriceEth
        onForceObject.volumeUsd += onForceTran.salePriceUSD;
    })

    onForceObject.volumeEth = Number((onForceObject.volumeEth).toFixed(2));
    if(OnForceTransactions.length === 0) {
        onForceObject.averageSalePriceEth = 0
        onForceObject.averageSalePriceUsd = 0
    } else {
        onForceObject.averageSalePriceEth = Number((onForceObject.volumeEth / OnForceTransactions.length).toFixed(2))
        onForceObject.averageSalePriceUsd = Number((onForceObject.volumeUsd / OnForceTransactions.length).toFixed(2))
    }
    onForceObject.marketCapEth = Math.round(Number(onForceObject.tokenSupply.replaceAll(',','')) * onforceFloorPrice)
    onForceObject.marketCapUsd = Math.round(onForceObject.marketCapEth * currentEthereumPrice)

    CoolCatsTransactions.forEach((catTran) => {
        coolCatsObject.volumeEth += catTran.salePriceEth
        coolCatsObject.volumeUsd += catTran.salePriceUSD;
    })

    coolCatsObject.volumeEth = Number((coolCatsObject.volumeEth).toFixed(2));
    if(CoolCatsTransactions.length === 0) {
        coolCatsObject.averageSalePriceEth = 0
        coolCatsObject.averageSalePriceUsd = 0
    } else {
        coolCatsObject.averageSalePriceEth = Number((coolCatsObject.volumeEth / CoolCatsTransactions.length).toFixed(2))
        coolCatsObject.averageSalePriceUsd = Number((coolCatsObject.volumeUsd / CoolCatsTransactions.length).toFixed(2))
    }
    coolCatsObject.marketCapEth = Math.round(Number(coolCatsObject.tokenSupply.replaceAll(',','')) * coolcatFloorPrice)
    coolCatsObject.marketCapUsd = Math.round(coolCatsObject.marketCapEth * currentEthereumPrice)

    PenguinTransactions.forEach((penguinTran) => {
        penguinObject.volumeEth += penguinTran.salePriceEth
        penguinObject.volumeUsd += penguinTran.salePriceUSD;
    })

    penguinObject.volumeEth = Number((penguinObject.volumeEth).toFixed(2));
    if(PenguinTransactions.length === 0) {
        penguinObject.averageSalePriceEth = 0
        penguinObject.averageSalePriceUsd = 0
    } else {
        penguinObject.averageSalePriceEth = Number((penguinObject.volumeEth / PenguinTransactions.length).toFixed(2))
        penguinObject.averageSalePriceUsd = Number((penguinObject.volumeUsd / PenguinTransactions.length).toFixed(2))
    }
    penguinObject.marketCapEth = Math.round(Number(penguinObject.tokenSupply.replaceAll(',','')) * penguinFloorPrice)
    penguinObject.marketCapUsd = Math.round(penguinObject.marketCapEth * currentEthereumPrice)



    // renders

    let collectionAnalytics = [doodleObject, azukiObject, boredApeObject, boredDogObject, moonbirdObject, onForceObject, coolCatsObject, penguinObject];
    //console.log(collectionAnalytics);
    res.json(collectionAnalytics)
});










// 1 HOUR

router.get('/hour', async (req, res) => {
            setFloorAndEth();
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
    
            let azukiTransactions = [];
            let BoredApeTransactions = [];
            let BoredDogTransactions = [];
            let CoolCatsTransactions = [];
            let DoodlesTransactions = [];
            let MoonbirdsTransactions = [];
            let OnForceTransactions = [];
            let PenguinTransactions = [];
    
        
            await Transaction.find({transactionTimeStamp: {$gte: passHour ,$lt: roundedThirty}})
            .sort({transactionTimeStamp: -1})
            .then((foundTrans) => {
                foundTrans.forEach((tran) => {
                    if (tran.collectionAddress === "0xed5af388653567af2f388e6224dc7c4b3241c544")  {
                        azukiTransactions.push(tran)
                    } else if (tran.collectionAddress === "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d") {
                        BoredApeTransactions.push(tran)
                    } else if (tran.collectionAddress === "0xba30e5f9bb24caa003e9f2f0497ad287fdf95623") {
                        BoredDogTransactions.push(tran)
                    } else if (tran.collectionAddress === "0x1a92f7381b9f03921564a437210bb9396471050c") {
                        CoolCatsTransactions.push(tran)
                    } else if (tran.collectionAddress === "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e") {
                        DoodlesTransactions.push(tran)
                    } else if (tran.collectionAddress === "0x23581767a106ae21c074b2276d25e5c3e136a68b") {
                        MoonbirdsTransactions.push(tran)
                    } else if (tran.collectionAddress === "0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d") {
                        OnForceTransactions.push(tran)
                    } else if (tran.collectionAddress === "0xbd3531da5cf5857e7cfaa92426877b022e612cf8") {
                        PenguinTransactions.push(tran)
                    } else {
                        console.log("No Collections Match");
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            })

            // DOODLES
            let doodleObject = {
                collectionName: 'Doodles',
                collectionLogo: 'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&w=3840',
                collectionAddress: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
                tokenSupply: '10,000',
                floorPrice: doodleFloorPrice,
                floorPriceUSD: Number((doodleFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: DoodlesTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // AZUKI
            let azukiObject = {
                collectionName: 'Azuki',
                collectionLogo: 'https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&w=3840',
                collectionAddress: '0xed5af388653567af2f388e6224dc7c4b3241c544',
                tokenSupply: '10,000',
                floorPrice: azukiFloorPrice,
                floorPriceUSD: Number((azukiFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: azukiTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // BORED APE
            let boredApeObject = {
                collectionName: 'Bored Ape Yacht Club',
                collectionLogo: 'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=3840',
                collectionAddress: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
                tokenSupply: '10,000',
                floorPrice: boredApeFloorPrice,
                floorPriceUSD: Number((boredApeFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: BoredApeTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // BORED DOG
            let boredDogObject = {
                collectionName: 'Bored Ape Kennel Club',
                collectionLogo: 'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=3840',
                collectionAddress: '0xba30e5f9bb24caa003e9f2f0497ad287fdf95623',
                tokenSupply: '9,602',
                floorPrice: boredDogFloorPrice,
                floorPriceUSD: Number((boredDogFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: BoredDogTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // MOONBIRDS
            let moonbirdObject = {
                collectionName: 'Moonbirds',
                collectionLogo: 'https://i.seadn.io/gae/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75?auto=format&w=3840',
                collectionAddress: '0x23581767a106ae21c074b2276d25e5c3e136a68b',
                tokenSupply: '10,000',
                floorPrice: moonbirdFloorPrice,
                floorPriceUSD: Number((moonbirdFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: MoonbirdsTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // ONFORCE
            let onForceObject = {
                collectionName: 'ON1 Force',
                collectionLogo: 'https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?auto=format&w=3840',
                collectionAddress: '0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d',
                tokenSupply: '7,777',
                floorPrice: onforceFloorPrice,
                floorPriceUSD: Number((onforceFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: OnForceTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // COOL CATS
            let coolCatsObject = {
                collectionName: 'Cool Cats',
                collectionLogo: 'https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?auto=format&w=3840',
                collectionAddress: '0x1a92f7381b9f03921564a437210bb9396471050c',
                tokenSupply: '10,000',
                floorPrice: coolcatFloorPrice,
                floorPriceUSD: Number((coolcatFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: CoolCatsTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // PUDGY PENGUINS
            let penguinObject = {
                collectionName: 'Pudgy Penguins',
                collectionLogo: 'https://i.seadn.io/gae/yNi-XdGxsgQCPpqSio4o31ygAV6wURdIdInWRcFIl46UjUQ1eV7BEndGe8L661OoG-clRi7EgInLX4LPu9Jfw4fq0bnVYHqg7RFi?auto=format&w=3840',
                collectionAddress: '0xbd3531da5cf5857e7cfaa92426877b022e612cf8',
                tokenSupply: '10,000',
                floorPrice: penguinFloorPrice,
                floorPriceUSD: Number((penguinFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: PenguinTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
    
            DoodlesTransactions.forEach((doodleTran) => {
                doodleObject.volumeEth += doodleTran.salePriceEth
                doodleObject.volumeUsd += doodleTran.salePriceUSD;
            })
    
            doodleObject.volumeEth = Number((doodleObject.volumeEth).toFixed(2));
            if(DoodlesTransactions.length === 0) {
                doodleObject.averageSalePriceEth = 0
                doodleObject.averageSalePriceUsd = 0
            } else {
                doodleObject.averageSalePriceEth = Number((doodleObject.volumeEth / DoodlesTransactions.length).toFixed(2))
                doodleObject.averageSalePriceUsd = Number((doodleObject.volumeUsd / DoodlesTransactions.length).toFixed(2))
            }
            doodleObject.marketCapEth = Math.round(Number(doodleObject.tokenSupply.replaceAll(',','')) * doodleFloorPrice)
            doodleObject.marketCapUsd = Math.round(doodleObject.marketCapEth * currentEthereumPrice)
    
            azukiTransactions.forEach((azukiTran) => {
                azukiObject.volumeEth += azukiTran.salePriceEth
                azukiObject.volumeUsd += azukiTran.salePriceUSD;
            })
    
            azukiObject.volumeEth = Number((azukiObject.volumeEth).toFixed(2));
            if(azukiTransactions.length === 0) {
                azukiObject.averageSalePriceEth = 0
                azukiObject.averageSalePriceUsd = 0
            } else {
                azukiObject.averageSalePriceEth = Number((azukiObject.volumeEth / azukiTransactions.length).toFixed(2))
                azukiObject.averageSalePriceUsd = Number((azukiObject.volumeUsd / azukiTransactions.length).toFixed(2))
            }
            azukiObject.marketCapEth = Math.round(Number(azukiObject.tokenSupply.replaceAll(',','')) * azukiFloorPrice)
            azukiObject.marketCapUsd = Math.round(azukiObject.marketCapEth * currentEthereumPrice)
    
            BoredApeTransactions.forEach((apeTran) => {
                boredApeObject.volumeEth += apeTran.salePriceEth
                boredApeObject.volumeUsd += apeTran.salePriceUSD;
            })
    
            boredApeObject.volumeEth = Number((boredApeObject.volumeEth).toFixed(2));
            if(BoredApeTransactions.length === 0) {
                boredApeObject.averageSalePriceEth = 0
                boredApeObject.averageSalePriceUsd = 0
            } else {
                boredApeObject.averageSalePriceEth = Number((boredApeObject.volumeEth / BoredApeTransactions.length).toFixed(2))
                boredApeObject.averageSalePriceUsd = Number((boredApeObject.volumeUsd / BoredApeTransactions.length).toFixed(2))
            }
            boredApeObject.marketCapEth = Math.round(Number(boredApeObject.tokenSupply.replaceAll(',','')) * boredApeFloorPrice)
            boredApeObject.marketCapUsd = Math.round(boredApeObject.marketCapEth * currentEthereumPrice)
    
            BoredDogTransactions.forEach((dogTran) => {
                boredDogObject.volumeEth += dogTran.salePriceEth
                boredDogObject.volumeUsd += dogTran.salePriceUSD;
            })
    
            boredDogObject.volumeEth = Number((boredDogObject.volumeEth).toFixed(2));
            if(BoredDogTransactions.length === 0) {
                boredDogObject.averageSalePriceEth = 0
                boredDogObject.averageSalePriceUsd = 0
            } else {
                boredDogObject.averageSalePriceEth = Number((boredDogObject.volumeEth / BoredDogTransactions.length).toFixed(2))
                boredDogObject.averageSalePriceUsd = Number((boredDogObject.volumeUsd / BoredDogTransactions.length).toFixed(2))
            }
            boredDogObject.marketCapEth = Math.round(Number(boredDogObject.tokenSupply.replaceAll(',','')) * boredDogFloorPrice)
            boredDogObject.marketCapUsd = Math.round(boredDogObject.marketCapEth * currentEthereumPrice)
    
            MoonbirdsTransactions.forEach((birdTran) => {
                moonbirdObject.volumeEth += birdTran.salePriceEth
                moonbirdObject.volumeUsd += birdTran.salePriceUSD;
            })
    
            moonbirdObject.volumeEth = Number((moonbirdObject.volumeEth).toFixed(2));
            if(MoonbirdsTransactions.length === 0) {
                moonbirdObject.averageSalePriceEth = 0
                moonbirdObject.averageSalePriceUsd = 0
            } else {
                moonbirdObject.averageSalePriceEth = Number((moonbirdObject.volumeEth / MoonbirdsTransactions.length).toFixed(2))
                moonbirdObject.averageSalePriceUsd = Number((moonbirdObject.volumeUsd / MoonbirdsTransactions.length).toFixed(2))
            }
            moonbirdObject.marketCapEth = Math.round(Number(moonbirdObject.tokenSupply.replaceAll(',','')) * moonbirdFloorPrice)
            moonbirdObject.marketCapUsd = Math.round(moonbirdObject.marketCapEth * currentEthereumPrice)
    
            OnForceTransactions.forEach((onForceTran) => {
                onForceObject.volumeEth += onForceTran.salePriceEth
                onForceObject.volumeUsd += onForceTran.salePriceUSD;
            })
    
            onForceObject.volumeEth = Number((onForceObject.volumeEth).toFixed(2));
            if(OnForceTransactions.length === 0) {
                onForceObject.averageSalePriceEth = 0
                onForceObject.averageSalePriceUsd = 0
            } else {
                onForceObject.averageSalePriceEth = Number((onForceObject.volumeEth / OnForceTransactions.length).toFixed(2))
                onForceObject.averageSalePriceUsd = Number((onForceObject.volumeUsd / OnForceTransactions.length).toFixed(2))
            }
            onForceObject.marketCapEth = Math.round(Number(onForceObject.tokenSupply.replaceAll(',','')) * onforceFloorPrice)
            onForceObject.marketCapUsd = Math.round(onForceObject.marketCapEth * currentEthereumPrice)
    
            CoolCatsTransactions.forEach((catTran) => {
                coolCatsObject.volumeEth += catTran.salePriceEth
                coolCatsObject.volumeUsd += catTran.salePriceUSD;
            })
    
            coolCatsObject.volumeEth = Number((coolCatsObject.volumeEth).toFixed(2));
            if(CoolCatsTransactions.length === 0) {
                coolCatsObject.averageSalePriceEth = 0
                coolCatsObject.averageSalePriceUsd = 0
            } else {
                coolCatsObject.averageSalePriceEth = Number((coolCatsObject.volumeEth / CoolCatsTransactions.length).toFixed(2))
                coolCatsObject.averageSalePriceUsd = Number((coolCatsObject.volumeUsd / CoolCatsTransactions.length).toFixed(2))
            }
            coolCatsObject.marketCapEth = Math.round(Number(coolCatsObject.tokenSupply.replaceAll(',','')) * coolcatFloorPrice)
            coolCatsObject.marketCapUsd = Math.round(coolCatsObject.marketCapEth * currentEthereumPrice)
    
            PenguinTransactions.forEach((penguinTran) => {
                penguinObject.volumeEth += penguinTran.salePriceEth
                penguinObject.volumeUsd += penguinTran.salePriceUSD;
            })
    
            penguinObject.volumeEth = Number((penguinObject.volumeEth).toFixed(2));
            if(PenguinTransactions.length === 0) {
                penguinObject.averageSalePriceEth = 0
                penguinObject.averageSalePriceUsd = 0
            } else {
                penguinObject.averageSalePriceEth = Number((penguinObject.volumeEth / PenguinTransactions.length).toFixed(2))
                penguinObject.averageSalePriceUsd = Number((penguinObject.volumeUsd / PenguinTransactions.length).toFixed(2))
            }
            penguinObject.marketCapEth = Math.round(Number(penguinObject.tokenSupply.replaceAll(',','')) * penguinFloorPrice)
            penguinObject.marketCapUsd = Math.round(penguinObject.marketCapEth * currentEthereumPrice)



            // Renders

            let collectionAnalytics = [doodleObject, azukiObject, boredApeObject, boredDogObject, moonbirdObject, onForceObject, coolCatsObject, penguinObject];
            //console.log(collectionAnalytics);
            res.json(collectionAnalytics)
});










// 1 DAY

router.get('/oneDay', async (req, res) => {
            setFloorAndEth();
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
    
            let azukiTransactions = [];
            let BoredApeTransactions = [];
            let BoredDogTransactions = [];
            let CoolCatsTransactions = [];
            let DoodlesTransactions = [];
            let MoonbirdsTransactions = [];
            let OnForceTransactions = [];
            let PenguinTransactions = [];
    
        
            await Transaction.find({transactionTimeStamp: {$gte: passDay ,$lt: roundedThirty}})
            .sort({transactionTimeStamp: -1})
            .then((foundTrans) => {
                foundTrans.forEach((tran) => {
                    if (tran.collectionAddress === "0xed5af388653567af2f388e6224dc7c4b3241c544")  {
                        azukiTransactions.push(tran)
                    } else if (tran.collectionAddress === "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d") {
                        BoredApeTransactions.push(tran)
                    } else if (tran.collectionAddress === "0xba30e5f9bb24caa003e9f2f0497ad287fdf95623") {
                        BoredDogTransactions.push(tran)
                    } else if (tran.collectionAddress === "0x1a92f7381b9f03921564a437210bb9396471050c") {
                        CoolCatsTransactions.push(tran)
                    } else if (tran.collectionAddress === "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e") {
                        DoodlesTransactions.push(tran)
                    } else if (tran.collectionAddress === "0x23581767a106ae21c074b2276d25e5c3e136a68b") {
                        MoonbirdsTransactions.push(tran)
                    } else if (tran.collectionAddress === "0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d") {
                        OnForceTransactions.push(tran)
                    } else if (tran.collectionAddress === "0xbd3531da5cf5857e7cfaa92426877b022e612cf8") {
                        PenguinTransactions.push(tran)
                    } else {
                        console.log("No Collections Match");
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            })

            // DOODLES
    
            let doodleObject = {
                collectionName: 'Doodles',
                collectionLogo: 'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&w=3840',
                collectionAddress: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
                tokenSupply: '10,000',
                floorPrice: doodleFloorPrice,
                floorPriceUSD: Number((doodleFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: DoodlesTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // AZUKI
            let azukiObject = {
                collectionName: 'Azuki',
                collectionLogo: 'https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&w=3840',
                collectionAddress: '0xed5af388653567af2f388e6224dc7c4b3241c544',
                tokenSupply: '10,000',
                floorPrice: azukiFloorPrice,
                floorPriceUSD: Number((azukiFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: azukiTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // BORED APE
            let boredApeObject = {
                collectionName: 'Bored Ape Yacht Club',
                collectionLogo: 'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=3840',
                collectionAddress: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
                tokenSupply: '10,000',
                floorPrice: boredApeFloorPrice,
                floorPriceUSD: Number((boredApeFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: BoredApeTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // BORED DOG
            let boredDogObject = {
                collectionName: 'Bored Ape Kennel Club',
                collectionLogo: 'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=3840',
                collectionAddress: '0xba30e5f9bb24caa003e9f2f0497ad287fdf95623',
                tokenSupply: '9,602',
                floorPrice: boredDogFloorPrice,
                floorPriceUSD: Number((boredDogFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: BoredDogTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // MOONBIRDS
            let moonbirdObject = {
                collectionName: 'Moonbirds',
                collectionLogo: 'https://i.seadn.io/gae/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75?auto=format&w=3840',
                collectionAddress: '0x23581767a106ae21c074b2276d25e5c3e136a68b',
                tokenSupply: '10,000',
                floorPrice: moonbirdFloorPrice,
                floorPriceUSD: Number((moonbirdFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: MoonbirdsTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // ONFORCE
            let onForceObject = {
                collectionName: 'ON1 Force',
                collectionLogo: 'https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?auto=format&w=3840',
                collectionAddress: '0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d',
                tokenSupply: '7,777',
                floorPrice: onforceFloorPrice,
                floorPriceUSD: Number((onforceFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: OnForceTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // COOL CATS
            let coolCatsObject = {
                collectionName: 'Cool Cats',
                collectionLogo: 'https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?auto=format&w=3840',
                collectionAddress: '0x1a92f7381b9f03921564a437210bb9396471050c',
                tokenSupply: '10,000',
                floorPrice: coolcatFloorPrice,
                floorPriceUSD: Number((coolcatFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: CoolCatsTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // PUDGY PENGUINS
            let penguinObject = {
                collectionName: 'Pudgy Penguins',
                collectionLogo: 'https://i.seadn.io/gae/yNi-XdGxsgQCPpqSio4o31ygAV6wURdIdInWRcFIl46UjUQ1eV7BEndGe8L661OoG-clRi7EgInLX4LPu9Jfw4fq0bnVYHqg7RFi?auto=format&w=3840',
                collectionAddress: '0xbd3531da5cf5857e7cfaa92426877b022e612cf8',
                tokenSupply: '10,000',
                floorPrice: penguinFloorPrice,
                floorPriceUSD: Number((penguinFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: PenguinTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
    
            DoodlesTransactions.forEach((doodleTran) => {
                doodleObject.volumeEth += doodleTran.salePriceEth
                doodleObject.volumeUsd += doodleTran.salePriceUSD;
            })
    
            doodleObject.volumeEth = Number((doodleObject.volumeEth).toFixed(2));
            if(DoodlesTransactions.length === 0) {
                doodleObject.averageSalePriceEth = 0
                doodleObject.averageSalePriceUsd = 0
            } else {
                doodleObject.averageSalePriceEth = Number((doodleObject.volumeEth / DoodlesTransactions.length).toFixed(2))
                doodleObject.averageSalePriceUsd = Number((doodleObject.volumeUsd / DoodlesTransactions.length).toFixed(2))
            }
            doodleObject.marketCapEth = Math.round(Number(doodleObject.tokenSupply.replaceAll(',','')) * doodleFloorPrice)
            doodleObject.marketCapUsd = Math.round(doodleObject.marketCapEth * currentEthereumPrice)
    
            azukiTransactions.forEach((azukiTran) => {
                azukiObject.volumeEth += azukiTran.salePriceEth
                azukiObject.volumeUsd += azukiTran.salePriceUSD;
            })
    
            azukiObject.volumeEth = Number((azukiObject.volumeEth).toFixed(2));
            if(azukiTransactions.length === 0) {
                azukiObject.averageSalePriceEth = 0
                azukiObject.averageSalePriceUsd = 0
            } else {
                azukiObject.averageSalePriceEth = Number((azukiObject.volumeEth / azukiTransactions.length).toFixed(2))
                azukiObject.averageSalePriceUsd = Number((azukiObject.volumeUsd / azukiTransactions.length).toFixed(2))
            }
            azukiObject.marketCapEth = Math.round(Number(azukiObject.tokenSupply.replaceAll(',','')) * azukiFloorPrice)
            azukiObject.marketCapUsd = Math.round(azukiObject.marketCapEth * currentEthereumPrice)
    
            BoredApeTransactions.forEach((apeTran) => {
                boredApeObject.volumeEth += apeTran.salePriceEth
                boredApeObject.volumeUsd += apeTran.salePriceUSD;
            })
    
            boredApeObject.volumeEth = Number((boredApeObject.volumeEth).toFixed(2));
            if(BoredApeTransactions.length === 0) {
                boredApeObject.averageSalePriceEth = 0
                boredApeObject.averageSalePriceUsd = 0
            } else {
                boredApeObject.averageSalePriceEth = Number((boredApeObject.volumeEth / BoredApeTransactions.length).toFixed(2))
                boredApeObject.averageSalePriceUsd = Number((boredApeObject.volumeUsd / BoredApeTransactions.length).toFixed(2))
            }
            boredApeObject.marketCapEth = Math.round(Number(boredApeObject.tokenSupply.replaceAll(',','')) * boredApeFloorPrice)
            boredApeObject.marketCapUsd = Math.round(boredApeObject.marketCapEth * currentEthereumPrice)
    
            BoredDogTransactions.forEach((dogTran) => {
                boredDogObject.volumeEth += dogTran.salePriceEth
                boredDogObject.volumeUsd += dogTran.salePriceUSD;
            })
    
            boredDogObject.volumeEth = Number((boredDogObject.volumeEth).toFixed(2));
            if(BoredDogTransactions.length === 0) {
                boredDogObject.averageSalePriceEth = 0
                boredDogObject.averageSalePriceUsd = 0
            } else {
                boredDogObject.averageSalePriceEth = Number((boredDogObject.volumeEth / BoredDogTransactions.length).toFixed(2))
                boredDogObject.averageSalePriceUsd = Number((boredDogObject.volumeUsd / BoredDogTransactions.length).toFixed(2))
            }
            boredDogObject.marketCapEth = Math.round(Number(boredDogObject.tokenSupply.replaceAll(',','')) * boredDogFloorPrice)
            boredDogObject.marketCapUsd = Math.round(boredDogObject.marketCapEth * currentEthereumPrice)
    
            MoonbirdsTransactions.forEach((birdTran) => {
                moonbirdObject.volumeEth += birdTran.salePriceEth
                moonbirdObject.volumeUsd += birdTran.salePriceUSD;
            })
    
            moonbirdObject.volumeEth = Number((moonbirdObject.volumeEth).toFixed(2));
            if(MoonbirdsTransactions.length === 0) {
                moonbirdObject.averageSalePriceEth = 0
                moonbirdObject.averageSalePriceUsd = 0
            } else {
                moonbirdObject.averageSalePriceEth = Number((moonbirdObject.volumeEth / MoonbirdsTransactions.length).toFixed(2))
                moonbirdObject.averageSalePriceUsd = Number((moonbirdObject.volumeUsd / MoonbirdsTransactions.length).toFixed(2))
            }
            moonbirdObject.marketCapEth = Math.round(Number(moonbirdObject.tokenSupply.replaceAll(',','')) * moonbirdFloorPrice)
            moonbirdObject.marketCapUsd = Math.round(moonbirdObject.marketCapEth * currentEthereumPrice)
    
            OnForceTransactions.forEach((onForceTran) => {
                onForceObject.volumeEth += onForceTran.salePriceEth
                onForceObject.volumeUsd += onForceTran.salePriceUSD;
            })
    
            onForceObject.volumeEth = Number((onForceObject.volumeEth).toFixed(2));
            if(OnForceTransactions.length === 0) {
                onForceObject.averageSalePriceEth = 0
                onForceObject.averageSalePriceUsd = 0
            } else {
                onForceObject.averageSalePriceEth = Number((onForceObject.volumeEth / OnForceTransactions.length).toFixed(2))
                onForceObject.averageSalePriceUsd = Number((onForceObject.volumeUsd / OnForceTransactions.length).toFixed(2))
            }
            onForceObject.marketCapEth = Math.round(Number(onForceObject.tokenSupply.replaceAll(',','')) * onforceFloorPrice)
            onForceObject.marketCapUsd = Math.round(onForceObject.marketCapEth * currentEthereumPrice)
    
            CoolCatsTransactions.forEach((catTran) => {
                coolCatsObject.volumeEth += catTran.salePriceEth
                coolCatsObject.volumeUsd += catTran.salePriceUSD;
            })
    
            coolCatsObject.volumeEth = Number((coolCatsObject.volumeEth).toFixed(2));
            if(CoolCatsTransactions.length === 0) {
                coolCatsObject.averageSalePriceEth = 0
                coolCatsObject.averageSalePriceUsd = 0
            } else {
                coolCatsObject.averageSalePriceEth = Number((coolCatsObject.volumeEth / CoolCatsTransactions.length).toFixed(2))
                coolCatsObject.averageSalePriceUsd = Number((coolCatsObject.volumeUsd / CoolCatsTransactions.length).toFixed(2))
            }
            coolCatsObject.marketCapEth = Math.round(Number(coolCatsObject.tokenSupply.replaceAll(',','')) * coolcatFloorPrice)
            coolCatsObject.marketCapUsd = Math.round(coolCatsObject.marketCapEth * currentEthereumPrice)
    
            PenguinTransactions.forEach((penguinTran) => {
                penguinObject.volumeEth += penguinTran.salePriceEth
                penguinObject.volumeUsd += penguinTran.salePriceUSD;
            })
    
            penguinObject.volumeEth = Number((penguinObject.volumeEth).toFixed(2));
            if(PenguinTransactions.length === 0) {
                penguinObject.averageSalePriceEth = 0
                penguinObject.averageSalePriceUsd = 0
            } else {
                penguinObject.averageSalePriceEth = Number((penguinObject.volumeEth / PenguinTransactions.length).toFixed(2))
                penguinObject.averageSalePriceUsd = Number((penguinObject.volumeUsd / PenguinTransactions.length).toFixed(2))
            }
            penguinObject.marketCapEth = Math.round(Number(penguinObject.tokenSupply.replaceAll(',','')) * penguinFloorPrice)
            penguinObject.marketCapUsd = Math.round(penguinObject.marketCapEth * currentEthereumPrice)



            // CONSOLE LOGS

            let collectionAnalytics = [doodleObject, azukiObject, boredApeObject, boredDogObject, moonbirdObject, onForceObject, coolCatsObject, penguinObject];
            res.json(collectionAnalytics)
});










// 3 DAY

router.get('/threeDay', async (req, res) => {
            setFloorAndEth();
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
    
            let azukiTransactions = [];
            let BoredApeTransactions = [];
            let BoredDogTransactions = [];
            let CoolCatsTransactions = [];
            let DoodlesTransactions = [];
            let MoonbirdsTransactions = [];
            let OnForceTransactions = [];
            let PenguinTransactions = [];
    
        
            await Transaction.find({transactionTimeStamp: {$gte: passThreeDay ,$lt: roundedThirty}})
            .sort({transactionTimeStamp: -1})
            .then((foundTrans) => {
                foundTrans.forEach((tran) => {
                    if (tran.collectionAddress === "0xed5af388653567af2f388e6224dc7c4b3241c544")  {
                        azukiTransactions.push(tran)
                    } else if (tran.collectionAddress === "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d") {
                        BoredApeTransactions.push(tran)
                    } else if (tran.collectionAddress === "0xba30e5f9bb24caa003e9f2f0497ad287fdf95623") {
                        BoredDogTransactions.push(tran)
                    } else if (tran.collectionAddress === "0x1a92f7381b9f03921564a437210bb9396471050c") {
                        CoolCatsTransactions.push(tran)
                    } else if (tran.collectionAddress === "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e") {
                        DoodlesTransactions.push(tran)
                    } else if (tran.collectionAddress === "0x23581767a106ae21c074b2276d25e5c3e136a68b") {
                        MoonbirdsTransactions.push(tran)
                    } else if (tran.collectionAddress === "0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d") {
                        OnForceTransactions.push(tran)
                    } else if (tran.collectionAddress === "0xbd3531da5cf5857e7cfaa92426877b022e612cf8") {
                        PenguinTransactions.push(tran)
                    } else {
                        console.log("No Collections Match");
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            })

            // DOODLES
    
            let doodleObject = {
                collectionName: 'Doodles',
                collectionLogo: 'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&w=3840',
                collectionAddress: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
                tokenSupply: '10,000',
                floorPrice: doodleFloorPrice,
                floorPriceUSD: Number((doodleFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: DoodlesTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // AZUKI
            let azukiObject = {
                collectionName: 'Azuki',
                collectionLogo: 'https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&w=3840',
                collectionAddress: '0xed5af388653567af2f388e6224dc7c4b3241c544',
                tokenSupply: '10,000',
                floorPrice: azukiFloorPrice,
                floorPriceUSD: Number((azukiFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: azukiTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // BORED APE
            let boredApeObject = {
                collectionName: 'Bored Ape Yacht Club',
                collectionLogo: 'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=3840',
                collectionAddress: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
                tokenSupply: '10,000',
                floorPrice: boredApeFloorPrice,
                floorPriceUSD: Number((boredApeFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: BoredApeTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // BORED DOG
            let boredDogObject = {
                collectionName: 'Bored Ape Kennel Club',
                collectionLogo: 'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=3840',
                collectionAddress: '0xba30e5f9bb24caa003e9f2f0497ad287fdf95623',
                tokenSupply: '9,602',
                floorPrice: boredDogFloorPrice,
                floorPriceUSD: Number((boredDogFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: BoredDogTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // MOONBIRDS
            let moonbirdObject = {
                collectionName: 'Moonbirds',
                collectionLogo: 'https://i.seadn.io/gae/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75?auto=format&w=3840',
                collectionAddress: '0x23581767a106ae21c074b2276d25e5c3e136a68b',
                tokenSupply: '10,000',
                floorPrice: moonbirdFloorPrice,
                floorPriceUSD: Number((moonbirdFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: MoonbirdsTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // ONFORCE
            let onForceObject = {
                collectionName: 'ON1 Force',
                collectionLogo: 'https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?auto=format&w=3840',
                collectionAddress: '0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d',
                tokenSupply: '7,777',
                floorPrice: onforceFloorPrice,
                floorPriceUSD: Number((onforceFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: OnForceTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // COOL CATS
            let coolCatsObject = {
                collectionName: 'Cool Cats',
                collectionLogo: 'https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?auto=format&w=3840',
                collectionAddress: '0x1a92f7381b9f03921564a437210bb9396471050c',
                tokenSupply: '10,000',
                floorPrice: coolcatFloorPrice,
                floorPriceUSD: Number((coolcatFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: CoolCatsTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // PUDGY PENGUINS
            let penguinObject = {
                collectionName: 'Pudgy Penguins',
                collectionLogo: 'https://i.seadn.io/gae/yNi-XdGxsgQCPpqSio4o31ygAV6wURdIdInWRcFIl46UjUQ1eV7BEndGe8L661OoG-clRi7EgInLX4LPu9Jfw4fq0bnVYHqg7RFi?auto=format&w=3840',
                collectionAddress: '0xbd3531da5cf5857e7cfaa92426877b022e612cf8',
                tokenSupply: '10,000',
                floorPrice: penguinFloorPrice,
                floorPriceUSD: Number((penguinFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: PenguinTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
    
            DoodlesTransactions.forEach((doodleTran) => {
                doodleObject.volumeEth += doodleTran.salePriceEth
                doodleObject.volumeUsd += doodleTran.salePriceUSD;
            })
    
            doodleObject.volumeEth = Number((doodleObject.volumeEth).toFixed(2));
            if(DoodlesTransactions.length === 0) {
                doodleObject.averageSalePriceEth = 0
                doodleObject.averageSalePriceUsd = 0
            } else {
                doodleObject.averageSalePriceEth = Number((doodleObject.volumeEth / DoodlesTransactions.length).toFixed(2))
                doodleObject.averageSalePriceUsd = Number((doodleObject.volumeUsd / DoodlesTransactions.length).toFixed(2))
            }
            doodleObject.marketCapEth = Math.round(Number(doodleObject.tokenSupply.replaceAll(',','')) * doodleFloorPrice)
            doodleObject.marketCapUsd = Math.round(doodleObject.marketCapEth * currentEthereumPrice)
    
            azukiTransactions.forEach((azukiTran) => {
                azukiObject.volumeEth += azukiTran.salePriceEth
                azukiObject.volumeUsd += azukiTran.salePriceUSD;
            })
    
            azukiObject.volumeEth = Number((azukiObject.volumeEth).toFixed(2));
            if(azukiTransactions.length === 0) {
                azukiObject.averageSalePriceEth = 0
                azukiObject.averageSalePriceUsd = 0
            } else {
                azukiObject.averageSalePriceEth = Number((azukiObject.volumeEth / azukiTransactions.length).toFixed(2))
                azukiObject.averageSalePriceUsd = Number((azukiObject.volumeUsd / azukiTransactions.length).toFixed(2))
            }
            azukiObject.marketCapEth = Math.round(Number(azukiObject.tokenSupply.replaceAll(',','')) * azukiFloorPrice)
            azukiObject.marketCapUsd = Math.round(azukiObject.marketCapEth * currentEthereumPrice)
    
            BoredApeTransactions.forEach((apeTran) => {
                boredApeObject.volumeEth += apeTran.salePriceEth
                boredApeObject.volumeUsd += apeTran.salePriceUSD;
            })
    
            boredApeObject.volumeEth = Number((boredApeObject.volumeEth).toFixed(2));
            if(BoredApeTransactions.length === 0) {
                boredApeObject.averageSalePriceEth = 0
                boredApeObject.averageSalePriceUsd = 0
            } else {
                boredApeObject.averageSalePriceEth = Number((boredApeObject.volumeEth / BoredApeTransactions.length).toFixed(2))
                boredApeObject.averageSalePriceUsd = Number((boredApeObject.volumeUsd / BoredApeTransactions.length).toFixed(2))
            }
            boredApeObject.marketCapEth = Math.round(Number(boredApeObject.tokenSupply.replaceAll(',','')) * boredApeFloorPrice)
            boredApeObject.marketCapUsd = Math.round(boredApeObject.marketCapEth * currentEthereumPrice)
    
            BoredDogTransactions.forEach((dogTran) => {
                boredDogObject.volumeEth += dogTran.salePriceEth
                boredDogObject.volumeUsd += dogTran.salePriceUSD;
            })
    
            boredDogObject.volumeEth = Number((boredDogObject.volumeEth).toFixed(2));
            if(BoredDogTransactions.length === 0) {
                boredDogObject.averageSalePriceEth = 0
                boredDogObject.averageSalePriceUsd = 0
            } else {
                boredDogObject.averageSalePriceEth = Number((boredDogObject.volumeEth / BoredDogTransactions.length).toFixed(2))
                boredDogObject.averageSalePriceUsd = Number((boredDogObject.volumeUsd / BoredDogTransactions.length).toFixed(2))
            }
            boredDogObject.marketCapEth = Math.round(Number(boredDogObject.tokenSupply.replaceAll(',','')) * boredDogFloorPrice)
            boredDogObject.marketCapUsd = Math.round(boredDogObject.marketCapEth * currentEthereumPrice)
    
            MoonbirdsTransactions.forEach((birdTran) => {
                moonbirdObject.volumeEth += birdTran.salePriceEth
                moonbirdObject.volumeUsd += birdTran.salePriceUSD;
            })
    
            moonbirdObject.volumeEth = Number((moonbirdObject.volumeEth).toFixed(2));
            if(MoonbirdsTransactions.length === 0) {
                moonbirdObject.averageSalePriceEth = 0
                moonbirdObject.averageSalePriceUsd = 0
            } else {
                moonbirdObject.averageSalePriceEth = Number((moonbirdObject.volumeEth / MoonbirdsTransactions.length).toFixed(2))
                moonbirdObject.averageSalePriceUsd = Number((moonbirdObject.volumeUsd / MoonbirdsTransactions.length).toFixed(2))
            }
            moonbirdObject.marketCapEth = Math.round(Number(moonbirdObject.tokenSupply.replaceAll(',','')) * moonbirdFloorPrice)
            moonbirdObject.marketCapUsd = Math.round(moonbirdObject.marketCapEth * currentEthereumPrice)
    
            OnForceTransactions.forEach((onForceTran) => {
                onForceObject.volumeEth += onForceTran.salePriceEth
                onForceObject.volumeUsd += onForceTran.salePriceUSD;
            })
    
            onForceObject.volumeEth = Number((onForceObject.volumeEth).toFixed(2));
            if(OnForceTransactions.length === 0) {
                onForceObject.averageSalePriceEth = 0
                onForceObject.averageSalePriceUsd = 0
            } else {
                onForceObject.averageSalePriceEth = Number((onForceObject.volumeEth / OnForceTransactions.length).toFixed(2))
                onForceObject.averageSalePriceUsd = Number((onForceObject.volumeUsd / OnForceTransactions.length).toFixed(2))
            }
            onForceObject.marketCapEth = Math.round(Number(onForceObject.tokenSupply.replaceAll(',','')) * onforceFloorPrice)
            onForceObject.marketCapUsd = Math.round(onForceObject.marketCapEth * currentEthereumPrice)
    
            CoolCatsTransactions.forEach((catTran) => {
                coolCatsObject.volumeEth += catTran.salePriceEth
                coolCatsObject.volumeUsd += catTran.salePriceUSD;
            })
    
            coolCatsObject.volumeEth = Number((coolCatsObject.volumeEth).toFixed(2));
            if(CoolCatsTransactions.length === 0) {
                coolCatsObject.averageSalePriceEth = 0
                coolCatsObject.averageSalePriceUsd = 0
            } else {
                coolCatsObject.averageSalePriceEth = Number((coolCatsObject.volumeEth / CoolCatsTransactions.length).toFixed(2))
                coolCatsObject.averageSalePriceUsd = Number((coolCatsObject.volumeUsd / CoolCatsTransactions.length).toFixed(2))
            }
            coolCatsObject.marketCapEth = Math.round(Number(coolCatsObject.tokenSupply.replaceAll(',','')) * coolcatFloorPrice)
            coolCatsObject.marketCapUsd = Math.round(coolCatsObject.marketCapEth * currentEthereumPrice)
    
            PenguinTransactions.forEach((penguinTran) => {
                penguinObject.volumeEth += penguinTran.salePriceEth
                penguinObject.volumeUsd += penguinTran.salePriceUSD;
            })
    
            penguinObject.volumeEth = Number((penguinObject.volumeEth).toFixed(2));
            if(PenguinTransactions.length === 0) {
                penguinObject.averageSalePriceEth = 0
                penguinObject.averageSalePriceUsd = 0
            } else {
                penguinObject.averageSalePriceEth = Number((penguinObject.volumeEth / PenguinTransactions.length).toFixed(2))
                penguinObject.averageSalePriceUsd = Number((penguinObject.volumeUsd / PenguinTransactions.length).toFixed(2))
            }
            penguinObject.marketCapEth = Math.round(Number(penguinObject.tokenSupply.replaceAll(',','')) * penguinFloorPrice)
            penguinObject.marketCapUsd = Math.round(penguinObject.marketCapEth * currentEthereumPrice)



            // CONSOLE LOGS

            let collectionAnalytics = [doodleObject, azukiObject, boredApeObject, boredDogObject, moonbirdObject, onForceObject, coolCatsObject, penguinObject];
            res.json(collectionAnalytics)
});










// 7 DAY

router.get('/sevenDay', async (req, res) => {
            setFloorAndEth();
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
    
            let azukiTransactions = [];
            let BoredApeTransactions = [];
            let BoredDogTransactions = [];
            let CoolCatsTransactions = [];
            let DoodlesTransactions = [];
            let MoonbirdsTransactions = [];
            let OnForceTransactions = [];
            let PenguinTransactions = [];
    
        
            await Transaction.find({transactionTimeStamp: {$gte: passWeek ,$lt: roundedThirty}})
            .sort({transactionTimeStamp: -1})
            .then((foundTrans) => {
                foundTrans.forEach((tran) => {
                    if (tran.collectionAddress === "0xed5af388653567af2f388e6224dc7c4b3241c544")  {
                        azukiTransactions.push(tran)
                    } else if (tran.collectionAddress === "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d") {
                        BoredApeTransactions.push(tran)
                    } else if (tran.collectionAddress === "0xba30e5f9bb24caa003e9f2f0497ad287fdf95623") {
                        BoredDogTransactions.push(tran)
                    } else if (tran.collectionAddress === "0x1a92f7381b9f03921564a437210bb9396471050c") {
                        CoolCatsTransactions.push(tran)
                    } else if (tran.collectionAddress === "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e") {
                        DoodlesTransactions.push(tran)
                    } else if (tran.collectionAddress === "0x23581767a106ae21c074b2276d25e5c3e136a68b") {
                        MoonbirdsTransactions.push(tran)
                    } else if (tran.collectionAddress === "0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d") {
                        OnForceTransactions.push(tran)
                    } else if (tran.collectionAddress === "0xbd3531da5cf5857e7cfaa92426877b022e612cf8") {
                        PenguinTransactions.push(tran)
                    } else {
                        console.log("No Collections Match");
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            })

            // DOODLES
            let doodleObject = {
                collectionName: 'Doodles',
                collectionLogo: 'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&w=3840',
                collectionAddress: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
                tokenSupply: '10,000',
                floorPrice: doodleFloorPrice,
                floorPriceUSD: Number((doodleFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: DoodlesTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // AZUKI
            let azukiObject = {
                collectionName: 'Azuki',
                collectionLogo: 'https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&w=3840',
                collectionAddress: '0xed5af388653567af2f388e6224dc7c4b3241c544',
                tokenSupply: '10,000',
                floorPrice: azukiFloorPrice,
                floorPriceUSD: Number((azukiFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: azukiTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // BORED APE
            let boredApeObject = {
                collectionName: 'Bored Ape Yacht Club',
                collectionLogo: 'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=3840',
                collectionAddress: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
                tokenSupply: '10,000',
                floorPrice: boredApeFloorPrice,
                floorPriceUSD: Number((boredApeFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: BoredApeTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // BORED DOG
            let boredDogObject = {
                collectionName: 'Bored Ape Kennel Club',
                collectionLogo: 'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=3840',
                collectionAddress: '0xba30e5f9bb24caa003e9f2f0497ad287fdf95623',
                tokenSupply: '9,602',
                floorPrice: boredDogFloorPrice,
                floorPriceUSD: Number((boredDogFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: BoredDogTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // MOONBIRDS
            let moonbirdObject = {
                collectionName: 'Moonbirds',
                collectionLogo: 'https://i.seadn.io/gae/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75?auto=format&w=3840',
                collectionAddress: '0x23581767a106ae21c074b2276d25e5c3e136a68b',
                tokenSupply: '10,000',
                floorPrice: moonbirdFloorPrice,
                floorPriceUSD: Number((moonbirdFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: MoonbirdsTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // ONFORCE
            let onForceObject = {
                collectionName: 'ON1 Force',
                collectionLogo: 'https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?auto=format&w=3840',
                collectionAddress: '0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d',
                tokenSupply: '7,777',
                floorPrice: onforceFloorPrice,
                floorPriceUSD: Number((onforceFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: OnForceTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // COOL CATS
            let coolCatsObject = {
                collectionName: 'Cool Cats',
                collectionLogo: 'https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?auto=format&w=3840',
                collectionAddress: '0x1a92f7381b9f03921564a437210bb9396471050c',
                tokenSupply: '10,000',
                floorPrice: coolcatFloorPrice,
                floorPriceUSD: Number((coolcatFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: CoolCatsTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
            // PUDGY PENGUINS
            let penguinObject = {
                collectionName: 'Pudgy Penguins',
                collectionLogo: 'https://i.seadn.io/gae/yNi-XdGxsgQCPpqSio4o31ygAV6wURdIdInWRcFIl46UjUQ1eV7BEndGe8L661OoG-clRi7EgInLX4LPu9Jfw4fq0bnVYHqg7RFi?auto=format&w=3840',
                collectionAddress: '0xbd3531da5cf5857e7cfaa92426877b022e612cf8',
                tokenSupply: '10,000',
                floorPrice: penguinFloorPrice,
                floorPriceUSD: Number((penguinFloorPrice * currentEthereumPrice).toFixed(2)),
                marketCapEth: 0,
                marketCapUsd: 0,
                totalSales: PenguinTransactions.length,
                averageSalePriceEth: 0,
                averageSalePriceUsd: 0,
                volumeEth: 0,
                volumeUsd: 0
            }
    
            DoodlesTransactions.forEach((doodleTran) => {
                doodleObject.volumeEth += doodleTran.salePriceEth
                doodleObject.volumeUsd += doodleTran.salePriceUSD;
            })
    
            doodleObject.volumeEth = Number((doodleObject.volumeEth).toFixed(2));
            if(DoodlesTransactions.length === 0) {
                doodleObject.averageSalePriceEth = 0
                doodleObject.averageSalePriceUsd = 0
            } else {
                doodleObject.averageSalePriceEth = Number((doodleObject.volumeEth / DoodlesTransactions.length).toFixed(2))
                doodleObject.averageSalePriceUsd = Number((doodleObject.volumeUsd / DoodlesTransactions.length).toFixed(2))
            }
            doodleObject.marketCapEth = Math.round(Number(doodleObject.tokenSupply.replaceAll(',','')) * doodleFloorPrice)
            doodleObject.marketCapUsd = Math.round(doodleObject.marketCapEth * currentEthereumPrice)

    
            azukiTransactions.forEach((azukiTran) => {
                azukiObject.volumeEth += azukiTran.salePriceEth
                azukiObject.volumeUsd += azukiTran.salePriceUSD;
            })
    
            azukiObject.volumeEth = Number((azukiObject.volumeEth).toFixed(2));
            if(azukiTransactions.length === 0) {
                azukiObject.averageSalePriceEth = 0
                azukiObject.averageSalePriceUsd = 0
            } else {
                azukiObject.averageSalePriceEth = Number((azukiObject.volumeEth / azukiTransactions.length).toFixed(2))
                azukiObject.averageSalePriceUsd = Number((azukiObject.volumeUsd / azukiTransactions.length).toFixed(2))
            }
            azukiObject.marketCapEth = Math.round(Number(azukiObject.tokenSupply.replaceAll(',','')) * azukiFloorPrice)
            azukiObject.marketCapUsd = Math.round(azukiObject.marketCapEth * currentEthereumPrice)

    
            BoredApeTransactions.forEach((apeTran) => {
                boredApeObject.volumeEth += apeTran.salePriceEth
                boredApeObject.volumeUsd += apeTran.salePriceUSD;
            })
    
            boredApeObject.volumeEth = Number((boredApeObject.volumeEth).toFixed(2));
            if(BoredApeTransactions.length === 0) {
                boredApeObject.averageSalePriceEth = 0
                boredApeObject.averageSalePriceUsd = 0
            } else {
                boredApeObject.averageSalePriceEth = Number((boredApeObject.volumeEth / BoredApeTransactions.length).toFixed(2))
                boredApeObject.averageSalePriceUsd = Number((boredApeObject.volumeUsd / BoredApeTransactions.length).toFixed(2))
            }
            boredApeObject.marketCapEth = Math.round(Number(boredApeObject.tokenSupply.replaceAll(',','')) * boredApeFloorPrice)
            boredApeObject.marketCapUsd = Math.round(boredApeObject.marketCapEth * currentEthereumPrice)
            
    
            BoredDogTransactions.forEach((dogTran) => {
                boredDogObject.volumeEth += dogTran.salePriceEth
                boredDogObject.volumeUsd += dogTran.salePriceUSD;
            })
    
            boredDogObject.volumeEth = Number((boredDogObject.volumeEth).toFixed(2));
            if(BoredDogTransactions.length === 0) {
                boredDogObject.averageSalePriceEth = 0
                boredDogObject.averageSalePriceUsd = 0
            } else {
                boredDogObject.averageSalePriceEth = Number((boredDogObject.volumeEth / BoredDogTransactions.length).toFixed(2))
                boredDogObject.averageSalePriceUsd = Number((boredDogObject.volumeUsd / BoredDogTransactions.length).toFixed(2))
            }
            boredDogObject.marketCapEth = Math.round(Number(boredDogObject.tokenSupply.replaceAll(',','')) * boredDogFloorPrice)
            boredDogObject.marketCapUsd = Math.round(boredDogObject.marketCapEth * currentEthereumPrice)

    
            MoonbirdsTransactions.forEach((birdTran) => {
                moonbirdObject.volumeEth += birdTran.salePriceEth
                moonbirdObject.volumeUsd += birdTran.salePriceUSD;
            })
    
            moonbirdObject.volumeEth = Number((moonbirdObject.volumeEth).toFixed(2));
            if(MoonbirdsTransactions.length === 0) {
                moonbirdObject.averageSalePriceEth = 0
                moonbirdObject.averageSalePriceUsd = 0
            } else {
                moonbirdObject.averageSalePriceEth = Number((moonbirdObject.volumeEth / MoonbirdsTransactions.length).toFixed(2))
                moonbirdObject.averageSalePriceUsd = Number((moonbirdObject.volumeUsd / MoonbirdsTransactions.length).toFixed(2))
            }
            moonbirdObject.marketCapEth = Math.round(Number(moonbirdObject.tokenSupply.replaceAll(',','')) * moonbirdFloorPrice)
            moonbirdObject.marketCapUsd = Math.round(moonbirdObject.marketCapEth * currentEthereumPrice)

    
            OnForceTransactions.forEach((onForceTran) => {
                onForceObject.volumeEth += onForceTran.salePriceEth
                onForceObject.volumeUsd += onForceTran.salePriceUSD;
            })
    
            onForceObject.volumeEth = Number((onForceObject.volumeEth).toFixed(2));
            if(OnForceTransactions.length === 0) {
                onForceObject.averageSalePriceEth = 0
                onForceObject.averageSalePriceUsd = 0
            } else {
                onForceObject.averageSalePriceEth = Number((onForceObject.volumeEth / OnForceTransactions.length).toFixed(2))
                onForceObject.averageSalePriceUsd = Number((onForceObject.volumeUsd / OnForceTransactions.length).toFixed(2))
            }
            onForceObject.marketCapEth = Math.round(Number(onForceObject.tokenSupply.replaceAll(',','')) * onforceFloorPrice)
            onForceObject.marketCapUsd = Math.round(onForceObject.marketCapEth * currentEthereumPrice)
    
            CoolCatsTransactions.forEach((catTran) => {
                coolCatsObject.volumeEth += catTran.salePriceEth
                coolCatsObject.volumeUsd += catTran.salePriceUSD;
            })
    
            coolCatsObject.volumeEth = Number((coolCatsObject.volumeEth).toFixed(2));
            if(CoolCatsTransactions.length === 0) {
                coolCatsObject.averageSalePriceEth = 0
                coolCatsObject.averageSalePriceUsd = 0
            } else {
                coolCatsObject.averageSalePriceEth = Number((coolCatsObject.volumeEth / CoolCatsTransactions.length).toFixed(2))
                coolCatsObject.averageSalePriceUsd = Number((coolCatsObject.volumeUsd / CoolCatsTransactions.length).toFixed(2))
            }
            coolCatsObject.marketCapEth = Math.round(Number(coolCatsObject.tokenSupply.replaceAll(',','')) * coolcatFloorPrice)
            coolCatsObject.marketCapUsd = Math.round(coolCatsObject.marketCapEth * currentEthereumPrice)
    
            PenguinTransactions.forEach((penguinTran) => {
                penguinObject.volumeEth += penguinTran.salePriceEth
                penguinObject.volumeUsd += penguinTran.salePriceUSD;
            })
    
            penguinObject.volumeEth = Number((penguinObject.volumeEth).toFixed(2));
            if(PenguinTransactions.length === 0) {
                penguinObject.averageSalePriceEth = 0
                penguinObject.averageSalePriceUsd = 0
            } else {
                penguinObject.averageSalePriceEth = Number((penguinObject.volumeEth / PenguinTransactions.length).toFixed(2))
                penguinObject.averageSalePriceUsd = Number((penguinObject.volumeUsd / PenguinTransactions.length).toFixed(2))
            }
            penguinObject.marketCapEth = Math.round(Number(penguinObject.tokenSupply.replaceAll(',','')) * penguinFloorPrice)
            penguinObject.marketCapUsd = Math.round(penguinObject.marketCapEth * currentEthereumPrice)



            // CONSOLE LOGS

            let collectionAnalytics = [doodleObject, azukiObject, boredApeObject, boredDogObject, moonbirdObject, onForceObject, coolCatsObject, penguinObject];
            res.json(collectionAnalytics)
});



module.exports = router;