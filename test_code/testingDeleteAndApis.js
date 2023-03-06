const Collection = require('../models/Collection.model')
const Nft = require('../models/Nft.model')
const Transaction = require('../models/Transaction.model')
var mongoose = require('mongoose');
const axios = require('axios')
require("dotenv").config();

let apiKey = 'UyD7R-88N_cLlw1-y8eQ8_3cUnMjwrIB'
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTsForCollection`;
const allNftsUrl = `${baseURL}?contractAddress=0x23581767a106ae21c074b2276d25e5c3e136a68b&withMetadata=true`;


mongoose
  .connect(process.env.MONGODB_URI)
  .then(async (x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    

    //DELETE ALL NFTS IN A COLLECTION BY USING COLLECTION TOKEN ARRAY
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


    //FIND NFTS BY NFTNAME AND LIMIT TO 10 GIVEN BACK
    // Nft.find({ nftName: "Bored Ape" },null, { skip: 10 ,  limit: 10 })
    //     .then((foundNfts) => {
    //         console.log(foundNfts);

              //DELETE ALL NFTS BY MATCHED NFTNAME FIELD
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


    // FIND ALL NFTS THAT EXIST
    // Nft.find()
    // .then((foundCollections) => {
    //     console.log(foundCollections.length);
    // })
    // .catch((err) => {
    //     console.log(err);
    // })

    // FIND ONE COLLECTION USING NFTNAME
    // Collection.findOne({ nftName: "Doodle"})
    //     .then((foundCollection) => {
    //         console.log(foundCollection.recentTranBlock);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })


    // FIND ALL TRANSACTIONS AND SORT THEM BY TIMESTAMP FROM GREATEST TO LEAST
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

    // API CALL TO GET CURRENT ETH PRICE BASED ON TIMESTAMP
    // const currentTimestamp = 1677024000
    // axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=${currentTimestamp}&api_key=5d5650ccd42d58b2acf771c64d075995bee36e9af725af927f466d6b0a4f2052`)
    // .then((response) => {
    //   console.log(response.data.ETH.USD);
    // })
    // .catch((err) => {
    //   console.log(err);
    // })


    // FIND ONE COLLECTION ANALYTICS 30min
    //let currentTimestamp = Math.floor(Date.now()/1000)
    // let currentTimestamp = 1677958278
    // const date = new Date(currentTimestamp * 1000); // Convert Unix timestamp to JavaScript Date object
    // const minutes = date.getMinutes();
    // const roundedMinutes = minutes - (minutes % 30); // Round down to nearest 30 minutes
    // date.setMinutes(roundedMinutes);
    // date.setSeconds(0);
    // date.setMilliseconds(0);
    // let roundedThirty = Math.floor(date.getTime() / 1000);
    // let passThirty = roundedThirty - 1800
    // console.log("ROUNDED THIRTY:",roundedThirty);
    // console.log("PASS THIRTY:",passThirty);

    // let collectionTransactions = [];
    // let foundCollectionDetails = {};
    // let collectionFloorPrice = 5.27;
    // let currentEthereumPrice = 1558;

    // await Collection.find({contractAddress: '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e'})
    // .then((foundCollection) => {
    //   //console.log(foundCollection);
    //     foundCollectionDetails = foundCollection;
    // })
    // .catch((err) => {
    //     console.log(err);
    // })

    // //console.log("DETAILS OBJECT", foundCollectionDetails);


    // await Transaction.find({collectionAddress: '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e', transactionTimeStamp: {$gte: passThirty ,$lt: roundedThirty}})
    // .sort({transactionTimeStamp: -1})
    // .then((foundTrans) => {
    //     foundTrans.forEach((tran) => {
    //         collectionTransactions.push(tran)
    //     })
    // })
    // .catch((err) => {
    //     console.log(err);
    // })

    // console.log("AMOUNT:", collectionTransactions.length);

    // // if (req.params.collectionAddress === '0xed5af388653567af2f388e6224dc7c4b3241c544') {
    // //     collectionFloorPrice = azukiFloorPrice;
    // // } else if (req.params.collectionAddress === '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d') {
    // //     collectionFloorPrice = boredApeFloorPrice;
    // // } else if (req.params.collectionAddress === '0xba30e5f9bb24caa003e9f2f0497ad287fdf95623') {
    // //     collectionFloorPrice = boredDogFloorPrice;
    // // } else if (req.params.collectionAddress === '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e') {
    // //     collectionFloorPrice = doodleFloorPrice;
    // // } else if (req.params.collectionAddress === '0x23581767a106ae21c074b2276d25e5c3e136a68b') {
    // //     collectionFloorPrice = moonbirdFloorPrice;
    // // } else if (req.params.collectionAddress === '0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d') {
    // //     collectionFloorPrice = onforceFloorPrice;
    // // } else if (req.params.collectionAddress === '0x1a92f7381b9f03921564a437210bb9396471050c') {
    // //     collectionFloorPrice = coolcatFloorPrice;
    // // } else if (req.params.collectionAddress === '0xbd3531da5cf5857e7cfaa92426877b022e612cf8') {
    // //     collectionFloorPrice = penguinFloorPrice;
    // // } else {
    // //     console.log("collection not found");
    // // }

    // // COLLECTION OBJECT TO PASS BACK TO FRONTEND

    // let collectionObject = {
    //     collectionName: foundCollectionDetails[0].collectionName,
    //     collectionLogo: foundCollectionDetails[0].logoUrl,
    //     collectionAddress: foundCollectionDetails[0].contractAddress,
    //     tokenSupply: foundCollectionDetails[0].tokenSupply,
    //     floorPrice: collectionFloorPrice,
    //     marketCapEth: 0,
    //     marketCapUsd: 0,
    //     totalSales: collectionTransactions.length,
    //     averageSalePriceEth: 0,
    //     averageSalePriceUsd: 0,
    //     volumeEth: 0,
    //     volumeUsd: 0
    // }

    // collectionTransactions.forEach((tran) => {
    //     collectionObject.volumeEth += tran.salePriceEth
    //     collectionObject.volumeUsd += tran.salePriceUSD;
    // })

    // //console.log(collectionObject);

    // collectionObject.volumeEth = Number((collectionObject.volumeEth).toFixed(2));
    // collectionObject.averageSalePriceEth = Number((collectionObject.volumeEth / collectionTransactions.length).toFixed(2))
    // collectionObject.averageSalePriceUsd = Number((collectionObject.volumeUsd / collectionTransactions.length).toFixed(2))
    // collectionObject.marketCapEth = Math.round(Number(collectionObject.tokenSupply.replaceAll(',','')) * collectionFloorPrice)
    // collectionObject.marketCapUsd = Math.round(collectionObject.marketCapEth * currentEthereumPrice)

    // // renders
    // console.log(collectionObject)



  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });