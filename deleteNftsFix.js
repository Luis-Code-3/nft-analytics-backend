const Collection = require('./models/Collection.model')
const Nft = require('./models/Nft.model')
const Transaction = require('./models/Transaction.model')
var mongoose = require('mongoose');
const axios = require('axios')
require("dotenv").config();

let apiKey = 'UyD7R-88N_cLlw1-y8eQ8_3cUnMjwrIB'
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTsForCollection`;
const allNftsUrl = `${baseURL}?contractAddress=0x23581767a106ae21c074b2276d25e5c3e136a68b&withMetadata=true`;


mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    
    // Collection.findById('')
    //     .then((foundCollection) => {
    //         foundCollection.tokens.forEach((token) => {
    //             Nft.findByIdAndDelete(token._id)
    //             .then((confirmation) => {
    //                 console.log(confirmation);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             })
    //         })
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    console.log("Helo");



    // Nft.find({ nftName: "Bored Ape" },null, { skip: 10 ,  limit: 10 })
    //     .then((foundNfts) => {
    //         console.log(foundNfts);
    //         // foundNfts.forEach((nft) => {
    //         //     console.log(nft.nftName);
    //         //     if (nft.nftName === 'Mutant Ape') {
    //         //         Nft.findByIdAndDelete(nft._id)
    //         //         .then((confirmation) => {
    //         //             console.log("DELETED:", confirmation);
    //         //         })
    //         //         .catch((err) => {
    //         //             console.log(err);
    //         //         })
    //         //     }
    //         // })
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })


    Nft.find()
    .then((foundCollections) => {
        console.log(foundCollections.length);
    })
    .catch((err) => {
        console.log(err);
    })


    // Collection.findOne({ nftName: "Doodle"})
    //     .then((foundCollection) => {
    //         console.log(foundCollection.recentTranBlock);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })

    // let newArr = [];

    // Transaction.find()
    // .sort({transactionTimestamp: -1})
    // .then((sortedTransactions) => {

    //   sortedTransactions.forEach((transaction) => {
    //     newArr.push(Number(transaction.transactionTimeStamp))
    //   })
    //   console.log(newArr);
    // })
    // .catch((err) => {
    //   console.log(err);
    // })

    // const currentTimestamp = 1677024000
    // axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=${currentTimestamp}&api_key=5d5650ccd42d58b2acf771c64d075995bee36e9af725af927f466d6b0a4f2052`)
    // .then((response) => {
    //   console.log(response.data.ETH.USD);
    // })
    // .catch((err) => {
    //   console.log(err);
    // })


  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });