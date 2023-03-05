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


// //


axios.get('https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&page=5&offset=10000&startblock=16688879&endblock=99999999&sort=desc&apikey=J7C1W8MKPMEPPCNRXDSH9ZXC4SY7NFT9YD')
    .then((response) => {
        //console.log(response.data);
        console.log(response.data);
        // console.log("MOST RECENT TRANSFER:",allTransfers.data.result[0]);
        // recentBlock = allTransfers.data.result[0].blockNumber
        //console.log("RECENT BLOCK NUMBER: START NEXT HERE:", recentBlock);
    })
    .catch((err) => {
        console.log(err);
    })



