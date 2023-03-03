const axios = require('axios');

let recentBlock = '16688879';

axios.get('https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=0x23581767a106ae21c074b2276D25e5C3e136a68b&page=1&offset=10000&startblock=16688879&endblock=99999999&sort=desc&apikey=J7C1W8MKPMEPPCNRXDSH9ZXC4SY7NFT9YD')
    .then((allTransfers) => {
        console.log(allTransfers.data.result.length);
        console.log("MOST RECENT TRANSFER:",allTransfers.data.result[0]);
        recentBlock = allTransfers.data.result[0].blockNumber
        console.log("RECENT BLOCK NUMBER: START NEXT HERE:", recentBlock);
    })
    .catch((err) => {
        console.log(err);
    })