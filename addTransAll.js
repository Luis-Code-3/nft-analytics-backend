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

    let currentTimestamp = Math.floor(Date.now()/1000)
    let currentEthereumPrice = 0;
    await axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=${currentTimestamp}&api_key=5d5650ccd42d58b2acf771c64d075995bee36e9af725af927f466d6b0a4f2052`)
    .then((response) => {
        currentEthereumPrice = response.data.ETH.USD;
      })
      .catch((err) => {
        console.log(err);
      })


    console.log("STARTING MOONBIRDS");
    await Moonbirds(currentEthereumPrice);
    console.log("FINISHED");
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("STARTING COOL CATS");
    await CoolCats(currentEthereumPrice);
    console.log("FINISHED");
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("STARTING DOODLES");
    await Doodles(currentEthereumPrice);
    console.log("FINISHED");
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("STARTING BORED APE");
    await BoredApe(currentEthereumPrice);
    console.log("FINISHED");
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("STARTING BORED DOG");
    await BoredDog(currentEthereumPrice);
    console.log("FINISHED");
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("STARTING AZUKI");
    await Azuki(currentEthereumPrice);
    console.log("FINISHED");
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("STARTING ONFORCE");
    await OnForce(currentEthereumPrice);
    console.log("FINISHED");
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("STARTING PUDGY PENGUINS");
    await PudgyPenguins(currentEthereumPrice);
    console.log("FINISHED");
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("ALL TRANSACTIONS UPDATED");

  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });