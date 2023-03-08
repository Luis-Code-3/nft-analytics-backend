const axios = require('axios');


// RESETING RECENTBLOCK TO START LOADING NEW TRANSACTIONS FROM HERE
let recentBlock = '16688879';

// axios.get('https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=0x23581767a106ae21c074b2276D25e5C3e136a68b&page=1&offset=10000&startblock=16688879&endblock=99999999&sort=desc&apikey=J7C1W8MKPMEPPCNRXDSH9ZXC4SY7NFT9YD')
//     .then((allTransfers) => {
//         console.log(allTransfers.data.result.length);
//         console.log("MOST RECENT TRANSFER:",allTransfers.data.result[0]);
//         recentBlock = allTransfers.data.result[0].blockNumber
//         console.log("RECENT BLOCK NUMBER: START NEXT HERE:", recentBlock);
//     })
//     .catch((err) => {
//         console.log(err);
//     })



//     // DATE TIMESTAMP RANGES
//     const currentTimestamp = Math.floor(Date.now()/1000)
//     const currentDate = new Date(currentTimestamp * 1000)
    
//     const currentStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-10)
//     const currentEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() -9)
    
//     const currentStartTimestamp = currentStart.getTime() / 1000
//     const currentEndTimestamp = currentEnd.getTime() / 1000
    
//     console.log(currentStartTimestamp)
//     console.log(currentEndTimestamp)


//16743995

// //


axios.get('https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=0xbd3531da5cf5857e7cfaa92426877b022e612cf8&page=1&offset=10000&startblock=16743995&endblock=99999999&sort=desc&apikey=J7C1W8MKPMEPPCNRXDSH9ZXC4SY7NFT9YD')
    .then((response) => {
        //console.log(response.data);
        console.log("Pudgy Penguins:",response.data.result.length);
        // console.log("MOST RECENT TRANSFER:",allTransfers.data.result[0]);
        // recentBlock = allTransfers.data.result[0].blockNumber
        //console.log("RECENT BLOCK NUMBER: START NEXT HERE:", recentBlock);
    })
    .catch((err) => {
        console.log(err);
    })


    // MOONBIRDS: 1583 (DONE) 1390
    // CoolCats: 382 (DONE) 333
    // BoredDogs: 1195 (DONE) 680
    // Azuki: 743 (DONE) 436
    // Pudgy Penguins: 584 (DONE) 426
    // Doodles: 2141 (DONE) 
    // BoredApes: 2758 (DONE)
    // ON1 Force: 1986 


    // 11,372 transfers


    // Cool Cats Fix: (DONE)
    // 25
    // 4394
    // 2617 64068e8a00cdb5814819b257
    // 2617
    // 4963 64068e9300cdb5814819b4f3

    // Penguins Fix: (DONE)
    // 4393 64069bb045746449fff7e9df
    // 8806
    // 3875

    // Azuki Fix: (DONE)
    // 9476
    // 9476
    // 9476
    // 9476
    // 5610 (check again)
    // 9476
    // 9476
    // 9476

    // BoredDog Fix: (DONE)
    // 9160 6406b99c4a8e2437c1e8afed
    // 3336 6406b9b34a8e2437c1e8b641
    // 6346 640761b0c98d70b2d8116b61

    // Moonbird Fix: (DONE)
    // 135 6406d57d893c1bd13d9211c2 
    // 7471 6406d57e893c1bd13d9211fe
    // 7471 6406d5b6893c1bd13d922272
    // 135 64075f31c98d70b2d8116982

    // Doodles Fix:(DONE)
    // 9224 64078d3de2e2f4bca7ca82e8
    // 1829 64078d49e2e2f4bca7ca8683
    // 1829 64078d4be2e2f4bca7ca8727
    // 7876 64078d94e2e2f4bca7ca9bbf

    // ON1 Foce Fix: (DONE)
    // 7195 64083e0d2354b132ff15b865
    // 3885 64083e0f2354b132ff15b8e9
    // 6459 64083e6f2354b132ff15d2f0
    // 3868 64083e702354b132ff15d33d
    // 5828 64083e862354b132ff15d961




    // {tokenName: "Moonbirds", salePriceEth: {$lt: 1}}
    // {nftName: "Moonbird", tokenId: "7471"}