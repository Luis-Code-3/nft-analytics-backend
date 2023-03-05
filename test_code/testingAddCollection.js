const Collection = require('../models/Collection.model')
const Nft = require('../models/Nft.model')
var mongoose = require('mongoose');
const axios = require('axios')
require("dotenv").config();

let apiKey = 'UyD7R-88N_cLlw1-y8eQ8_3cUnMjwrIB'
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTsForCollection`;
const allNftsUrl = `${baseURL}?contractAddress=0xba30e5f9bb24caa003e9f2f0497ad287fdf95623&withMetadata=true`;


console.log("hey 1");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    Collection.create({
        collectionName:'Bored Ape Kennel Club',
        nftName: 'Dog',
        logoUrl:'https://i.seadn.io/gcs/files/c4dfc6be4d9c5d4f073de2efe181416a.jpg?auto=format&w=3840',
        tokenSupply: '9,602',
        contractAddress:'0xba30e5f9bb24caa003e9f2f0497ad287fdf95623',
        description: "It gets lonely in the swamp sometimes. That's why every ape should have a four-legged companion. To curl up at your feet. To bring you a beer. To fire a missile launcher at that bastard Jimmy the Monkey.",
        opensea:'https://opensea.io/collection/bored-ape-kennel-club',
        twitter: 'https://www.twitter.com/BoredApeYC',
        website:'http://www.boredapeyachtclub.com/',
        etherscan: 'https://etherscan.io/token/0xba30e5f9bb24caa003e9f2f0497ad287fdf95623',
    })
    .then( async (createdCollection) => {
        console.log('hey');
        // let allNftsInCollection = []
    
        // let nftsFromAlchemy = await axios.get(allNftsUrl)
    
        // nftsFromAlchemy.data.nfts.forEach((thisNft) => {
        //     let newNftObject = {
        //         tokenId: thisNft.id.tokenId,
        //         imageUrl: thisNft.media[0].gateway
        //     }
    
        //     allNftsInCollection.push(newNftObject)
        // })
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
                await checkIfMore()
        }
    
    
        const checkIfMore = async () => {
            if(nftsFromAlchemy.data.nextToken) {
                nftsFromAlchemy = await axios.get(`${baseURL}?contractAddress=0xba30e5f9bb24caa003e9f2f0497ad287fdf95623&withMetadata=true&startToken=${nftsFromAlchemy.data.nextToken}`)
                nftsFromAlchemy.data.nfts.forEach((thisNft) => {
                    let newNftObject = {
                        tokenId: thisNft.id.tokenId,
                        imageUrl: thisNft.media[0].gateway
                    }
            
                    allNftsInCollection.push(newNftObject)
                })
                console.log("Loading with Next 100:", allNftsInCollection.length);
                await checkIfMore();
            } else {
                //console.log(allNftsInCollection);
                console.log(allNftsInCollection.length);
            }
        }
    
        await getAllNfts();
        
        allNftsInCollection.forEach((selectedNft) => {
            //console.log("TESTING LENGTH:",allNftsInCollection.length);
            Nft.create({
                nftName: createdCollection.nftName,
                tokenId: BigInt(selectedNft.tokenId).toString(),
                imageUrl: selectedNft.imageUrl,
                fromCollectionName: createdCollection.collectionName,
                fromCollection: createdCollection._id,
                collectionAddress: createdCollection.contractAddress,
            })
            .then((createdNft) => {
                Collection.findByIdAndUpdate(createdCollection._id, {
                    $push: {tokens: createdNft._id}
                }, {new: true})
                .then((updatedCollection) => {
                    //console.log("Updated COLLECTION:",updatedCollection);
                })
                .catch((err) => {
                    console.log(err);
                })
            })
            .catch((err) => {
                console.log(err);
                console.log(selectedNft);
            })
        })
    
        //mongoose.connection.close()
        console.log("Seed Completed");
        return;
    
    
    })
    .catch((err) => {
     console.log(err);
    })
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });


// Collection.create({
//     collectionName:'Bored Ape Yacht Club',
//     nftName: 'Bored Ape',
//     logoUrl:'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=3840',
//     tokenSupply: '10,000',
//     contractAddress:'0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
//     description: 'The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation. Visit www.BoredApeYachtClub.com for more details.',
//     opensea:'https://opensea.io/collection/boredapeyachtclub',
//     twitter: 'https://twitter.com/BoredApeYC',
//     website:'https://boredapeyachtclub.com/#/',
//     etherscan: 'https://etherscan.io/token/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
// })
// .then( async (createdCollection) => {
//     console.log('hey');
//     // let allNftsInCollection = []

//     // let nftsFromAlchemy = await axios.get(allNftsUrl)

//     // nftsFromAlchemy.data.nfts.forEach((thisNft) => {
//     //     let newNftObject = {
//     //         tokenId: thisNft.id.tokenId,
//     //         imageUrl: thisNft.media[0].gateway
//     //     }

//     //     allNftsInCollection.push(newNftObject)
//     // })
//     let allNftsInCollection = []
//     let nftsFromAlchemy = {};

//     const getAllNfts = async () => {
//         nftsFromAlchemy = await axios.get(allNftsUrl);
//         //console.log(nftsFromAlchemy);
//             nftsFromAlchemy.data.nfts.forEach((thisNft) => {
//                 let newNftObject = {
//                     tokenId: thisNft.id.tokenId,
//                     imageUrl: thisNft.media[0].gateway
//                 }
//                 allNftsInCollection.push(newNftObject)
//             })
//             console.log("First 100:", allNftsInCollection.length);
//             await checkIfMore()
//     }


//     const checkIfMore = async () => {
//         if(nftsFromAlchemy.data.nextToken) {
//             nftsFromAlchemy = await axios.get(`${baseURL}?contractAddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&withMetadata=true&startToken=${nftsFromAlchemy.data.nextToken}`)
//             nftsFromAlchemy.data.nfts.forEach((thisNft) => {
//                 let newNftObject = {
//                     tokenId: thisNft.id.tokenId,
//                     imageUrl: thisNft.media[0].gateway
//                 }
        
//                 allNftsInCollection.push(newNftObject)
//             })
//             console.log("Loading with Next 100:", allNftsInCollection.length);
//             //checkIfMore();
//         } else {
//             //console.log(allNftsInCollection);
//             console.log(allNftsInCollection.length);
//         }
//     }

//     await getAllNfts();
    
//     allNftsInCollection.forEach((selectedNft) => {
//         Nft.create({
//             nftName: createdCollection.nftName,
//             tokenId: selectedNft.tokenId,
//             imageUrl: selectedNft.imageUrl,
//             fromCollectionName: createdCollection.collectionName,
//             fromCollectionId: createdCollection._id,
//             collectionAddress: createdCollection.contractAddress,
//         })
//         .then((createdNft) => {
//             Collection.findByIdAndUpdate(createdCollection._id, {
//                 $push: {tokens: createdNft._id}
//             }, {new: true})
//             .then((updatedCollection) => {
//                 console.log("Updated COLLECTION:",updatedCollection);
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//         })
//         .catch((err) => {
//             console.log(err);
//         })
//     })

//     mongoose.connection.close()

//     return;


// })
// .catch((err) => {

// })