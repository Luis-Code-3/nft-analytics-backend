let apiKey = 'UyD7R-88N_cLlw1-y8eQ8_3cUnMjwrIB'
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTsForCollection`;
const allNftsUrl = `${baseURL}?contractAddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&withMetadata=true`;
const axios = require('axios');
const { all } = require('./routes');




// SCRIPT FOR GRABBING ALL NFTS FROM COLLECTION. HITTIN ALCHEMY API
let allNftsInCollection = []
let nftsFromAlchemy = {};



const getAllNfts = async () => {
    nftsFromAlchemy = await axios.get(allNftsUrl);
    //console.log(nftsFromAlchemy);
        nftsFromAlchemy.data.nfts.forEach((thisNft) => {
            let newNftObject = {
                tokenId: thisNft.id.tokenId,
                imageUrl: thisNft.media[0].gateway
            }
            allNftsInCollection.push(newNftObject)
        })
        console.log("First 100:", allNftsInCollection.length);
        checkIfMore()
}


const checkIfMore = async () => {
    if(nftsFromAlchemy.data.nextToken) {
        nftsFromAlchemy = await axios.get(`${baseURL}?contractAddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&withMetadata=true&startToken=${nftsFromAlchemy.data.nextToken}`)
        nftsFromAlchemy.data.nfts.forEach((thisNft) => {
            let newNftObject = {
                tokenId: thisNft.id.tokenId,
                imageUrl: thisNft.media[0].gateway
            }
    
            allNftsInCollection.push(newNftObject)
        })
        console.log("Loading with Next 100:", allNftsInCollection.length);
        checkIfMore();
    } else {
        //console.log(allNftsInCollection);
        console.log(allNftsInCollection.length);
    }
}



getAllNfts();

// console.log(allNftsInCollection);
// console.log(allNftsInCollection.length);
