const Collection = require('./models/Collection.model')
const Nft = require('./models/Nft.model')
const Transaction = require('./models/Transaction.model')
var mongoose = require('mongoose');
const axios = require('axios')
require("dotenv").config();

let azukiFloorPrice = 0;
let boredApeFloorPrice = 0;
let boredDogFloorPrice = 0;
let doodleFloorPrice = 0;
let moonbirdFloorPrice = 0;
let onforceFloorPrice = 0;
let coolcatFloorPrice = 0;
let penguinFloorPrice = 0;
let currentTimestampLink = Math.floor(Date.now()/1000)
let currentEthereumPrice = 0;

async function getFloorPriceAndEthPrice() {
    await axios.get(`https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.ALCHEMY_KEY}/getFloorPrice?contractAddress=0x8a90cab2b38dba80c64b7734e58ee1db38b8992e`)
        .then((response) => {
            doodleFloorPrice = response.data.openSea.floorPrice;
        })
        .catch((err) => {
            console.log(err);
        })

    await axios.get(`https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.ALCHEMY_KEY}/getFloorPrice?contractAddress=0xed5af388653567af2f388e6224dc7c4b3241c544`)
        .then((response) => {
            azukiFloorPrice = response.data.openSea.floorPrice;
        })
        .catch((err) => {
            console.log(err);
        })

    await axios.get(`https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.ALCHEMY_KEY}/getFloorPrice?contractAddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d`)
        .then((response) => {
            boredApeFloorPrice = response.data.openSea.floorPrice;
        })
        .catch((err) => {
            console.log(err);
        })

    await axios.get(`https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.ALCHEMY_KEY}/getFloorPrice?contractAddress=0xba30e5f9bb24caa003e9f2f0497ad287fdf95623`)
        .then((response) => {
            boredDogFloorPrice = response.data.openSea.floorPrice;
        })
        .catch((err) => {
            console.log(err);
        })

    await axios.get(`https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.ALCHEMY_KEY}/getFloorPrice?contractAddress=0x23581767a106ae21c074b2276d25e5c3e136a68b`)
        .then((response) => {
            moonbirdFloorPrice = response.data.openSea.floorPrice;
        })
        .catch((err) => {
            console.log(err);
        })

    await axios.get(`https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.ALCHEMY_KEY}/getFloorPrice?contractAddress=0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d`)
        .then((response) => {
            onforceFloorPrice = response.data.openSea.floorPrice;
        })
        .catch((err) => {
            console.log(err);
        })

    await axios.get(`https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.ALCHEMY_KEY}/getFloorPrice?contractAddress=0x1a92f7381b9f03921564a437210bb9396471050c`)
        .then((response) => {
            coolcatFloorPrice = response.data.openSea.floorPrice;
        })
        .catch((err) => {
            console.log(err);
        })

    await axios.get(`https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.ALCHEMY_KEY}/getFloorPrice?contractAddress=0xbd3531da5cf5857e7cfaa92426877b022e612cf8`)
        .then((response) => {
            penguinFloorPrice = response.data.openSea.floorPrice;
        })
        .catch((err) => {
            console.log(err);
        })
    
    await axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=${currentTimestampLink}&api_key=${process.env.CRYPTOCOMPARE_KEY}`)
    .then((response) => {
        currentEthereumPrice = response.data.ETH.USD;
      })
      .catch((err) => {
        console.log(err);
      })
      
    
}

function returnFloorPriceAndEthPrice() {
    let newArr = [
        azukiFloorPrice,
        boredApeFloorPrice,
        boredDogFloorPrice,
        doodleFloorPrice,
        moonbirdFloorPrice,
        onforceFloorPrice,
        coolcatFloorPrice,
        penguinFloorPrice,
        currentEthereumPrice
    ]
    return newArr;
}


module.exports = {
    getFloorPriceAndEthPrice,
    returnFloorPriceAndEthPrice
}