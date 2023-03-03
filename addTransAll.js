const Collection = require('./models/Collection.model')
const Nft = require('./models/Nft.model')
const Transaction = require('./models/Transaction.model')
const Moonbirds = require('./addTransactionsMoonBirds')
const PudgyPenguins = require('./addTransactionsPenguins')
const Doodles = require('./addTransactionsDoodles')
const Azuki = require('./addTransactionsAzuki')
const BoredApe = require('./addTransactionsBoredApe')
const BoredDog = require('./addTransactionsBoredDogs')
const CoolCats = require('./addTransactionsCoolCats')
const OnForce = require('./addTransactionsOnForce')
var mongoose = require('mongoose');
const axios = require('axios')
require("dotenv").config();

// let apiKey = 'UyD7R-88N_cLlw1-y8eQ8_3cUnMjwrIB'
// const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTsForCollection`;
// const allNftsUrl = `${baseURL}?contractAddress=0x23581767a106ae21c074b2276d25e5c3e136a68b&withMetadata=true`;


mongoose
  .connect(process.env.MONGODB_URI)
  .then(async (x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);

    console.log("STARTING");
    await Moonbirds();
    console.log("FINISHED");
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("STARTING NEXT");
    await CoolCats();
    console.log("FINISHED");
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("STARTING NEXT");
    await Doodles();
    console.log("FINISHED");
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("STARTING NEXT");
    await BoredApe();
    console.log("FINISHED");
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("STARTING NEXT");
    await BoredDog();
    console.log("FINISHED");
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("STARTING NEXT");
    await Azuki();
    console.log("FINISHED");
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("STARTING NEXT");
    await OnForce();
    console.log("FINISHED");
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("STARTING NEXT");
    await PudgyPenguins();
    console.log("FINISHED");
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("ALL TRANSACTIONS UPDATED");

  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });