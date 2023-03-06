const axios = require('axios')
const Transaction = require('./models/Transaction.model')
const Collection = require('./models/Collection.model')
const Nft = require('./models/Nft.model')
require('dotenv').config()

const key = process.env.ETHERSCAN_KEY;
const collectionAddy = '0x23581767a106ae21c074b2276D25e5C3e136a68b';
const tokenTransfersCollection = `https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=0x23581767a106ae21c074b2276D25e5C3e136a68b&page=1&offset=100&startblock=0&endblock=99999999&sort=desc&apikey=${key}`;


async function Moonbirds (currentEthereumPrice) {
    
    let sortedArray = [];
    let recentTransactionBlock = '';
    //console.log(currentEthereumPrice);

    await Collection.findOne({ nftName: "Moonbird"})
        .then((foundCollection) => {
            console.log(foundCollection.recentTranBlock);
            recentTransactionBlock = foundCollection.recentTranBlock
        })
        .catch((err) => {
            console.log(err);
        })

    const findNftTransactions = async () => {
        const transfers = await axios.get(`https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=0x23581767a106ae21c074b2276D25e5C3e136a68b&page=1&offset=100&startblock=${recentTransactionBlock}&endblock=99999999&sort=desc&apikey=${key}`);

        if(transfers.data.result.length > 0) {
            recentTransactionBlock = (Number(transfers.data.result[0].blockNumber) + 1).toString();
            console.log("GETTING HIT");
        }

    
        const newTransactions = await transfers.data.result.map((el) => {
          let nftSale = {
            buyer: el.to,
            seller: el.from,
            tokenName: el.tokenName,
            tokenId: el.tokenID,
            txHash:el.hash,
            salePrice: '',
            salePriceUsd: 0,
            collectionAddress: el.contractAddress,
            transactionTimeStamp: Number(el.timeStamp),
            blockNumber: el.blockNumber,
            nonce: el.nonce,
            transactionIndex: el.transactionIndex
          }
          return nftSale;
        })
    
        //console.log("Before Manipulation:", [...newTransactions]);
    
        const processTransactions = async (transactions) => {
          for (const transaction of transactions) {
            console.log("CHECKING TRANSACTION");
            await new Promise(resolve => setTimeout(resolve, 2000));
            await AddSalePrice(transaction);
          }
        }
    
        const AddSalePricing = await processTransactions(newTransactions);
    
        console.log("Final:", sortedArray);
        console.log("Most Recent Transaction:", recentTransactionBlock);
        await addUsdPrice();
        await addToDatabase();
    
    };


    const AddSalePrice = async (obj) => {
        //Remove Blur Marketplace Bidding Buys, still holds 1 Transaction
        if (obj.buyer === '0x39da41747a83aee658334415666f3ef92dd0d541') {
          return;
        }
        //console.log(obj.tokenId);

        const txInfo = await axios.get(`https://api.etherscan.io/api?module=account&action=txlistinternal&txhash=${obj.txHash}&apikey=${key}`)
        //console.log(txInfo.data.result);
          if(txInfo.data.result.length === 0) {
            await deeperSaleCheck(obj);
          } else if(txInfo.data.result.length === 1) {
            return;
          } else if (txInfo.data.result[0].from === '0x3b968d2d299b895a5fcf3bba7a64ad0f566e6f88' || txInfo.data.result[1].from === '0x3b968d2d299b895a5fcf3bba7a64ad0f566e6f88' || txInfo.data.result[0].from === '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' || txInfo.data.result[1].from === '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2') {
            // might have to adjust this conditional to account for 1 internal transaction.
            return;
          } else {
            //console.log(txInfo.data.result[txInfo.data.result.length - 1].value);
            //console.log(txInfo.data.result[txInfo.data.result.length - 2].value);
            let newPrice = (Number(txInfo.data.result[txInfo.data.result.length - 1].value) + Number(txInfo.data.result[txInfo.data.result.length - 2].value)) / 10**18;
            obj.salePrice = newPrice.toString();
            sortedArray.push(obj)
          }
    }


    const deeperSaleCheck = async (sameObj) => {
        //console.log('DEEPER CHECK TOKEN:', sameObj.tokenId);
        const buyerTokenTransfers = await axios.get(`https://api.etherscan.io/api?module=account&action=tokentx&address=${sameObj.buyer}&page=1&offset=100&startblock=0&endblock=27025780&sort=desc&apikey=${key}`)
        let filteredTransfers = buyerTokenTransfers.data.result.filter((transfer) => {
          return sameObj.transactionTimeStamp === Number(transfer.timeStamp) && sameObj.blockNumber === transfer.blockNumber && sameObj.nonce === transfer.nonce && sameObj.transactionIndex === transfer.transactionIndex && transfer.tokenSymbol !== 'APE'
        })
        //console.log("Filtered Transfers",filteredTransfers);
    
        let calculatedSalePrice = 0;
    
        if (filteredTransfers.length > 0) {
          calculatedSalePrice = (Number(filteredTransfers[0].value) + Number(filteredTransfers[1].value)) / 10**18;
        }
    
        //conditional check for 1 transfer(transaction in this case for the user)
    
        if (calculatedSalePrice > 0) {
          sameObj.salePrice = calculatedSalePrice.toString();
          sortedArray.push(sameObj)
        }
        
    }


    const addUsdPrice = async () => {
      for (const saleTran of sortedArray) {

        let ethPrice = 0;

        if(saleTran.transactionTimeStamp >= 1677024000 && saleTran.transactionTimeStamp < 1677110400) {
          ethPrice = 1,643.23;
        } else if(saleTran.transactionTimeStamp >= 1677110400 && saleTran.transactionTimeStamp < 1677196800) {
          ethPrice = 1,651.07;
        } else if(saleTran.transactionTimeStamp >= 1677196800 && saleTran.transactionTimeStamp < 1677283200) {
          ethPrice = 1,608.37;
        } else if(saleTran.transactionTimeStamp >= 1677283200 && saleTran.transactionTimeStamp < 1677369600) {
          ethPrice = 1,594.91;
        } else if(saleTran.transactionTimeStamp >= 1677369600 && saleTran.transactionTimeStamp < 1677456000) {
          ethPrice = 1,640.82;
        } else if(saleTran.transactionTimeStamp >= 1677456000 && saleTran.transactionTimeStamp < 1677542400) {
          ethPrice = 1,634.33;
        } else if(saleTran.transactionTimeStamp >= 1677542400 && saleTran.transactionTimeStamp < 1677628800) {
          ethPrice = 1,605.90;
        } else if(saleTran.transactionTimeStamp >= 1677628800 && saleTran.transactionTimeStamp < 1677715200) {
          ethPrice = 1,663.43;
        } else if(saleTran.transactionTimeStamp >= 1677715200 && saleTran.transactionTimeStamp < 1677801600) {
          ethPrice = 1,647.32;
        } else if(saleTran.transactionTimeStamp >= 1677801600 && saleTran.transactionTimeStamp < 1677888000) {
          ethPrice = 1,569.17;
        } else if(saleTran.transactionTimeStamp >= 1677888000 && saleTran.transactionTimeStamp < 1677974400) {
          ethPrice = 1,566.92;
        } else if(saleTran.transactionTimeStamp >= 1677974400 && saleTran.transactionTimeStamp < 1678060800) {
          ethPrice = 1,564.47;
        } else {
          ethPrice = currentEthereumPrice;
        }

        saleTran.salePriceUsd = Number((saleTran.salePrice * ethPrice).toFixed(2))
      }
    }




    const addToDatabase = async () => {
        for (const sale of sortedArray) {
            await Transaction.create({
                buyer: sale.buyer,
                seller: sale.seller,
                tokenName: sale.tokenName,
                tokenId: sale.tokenId,
                salePriceEth: Number(sale.salePrice),
                salePriceUSD: sale.salePriceUsd,
                transactionTimeStamp: sale.transactionTimeStamp,
                blockNumber: sale.blockNumber,
                transactionHash: sale.txHash,
                collectionAddress: sale.collectionAddress,
            })
            .then((createdTransaction) => {
                Nft.findOneAndUpdate({collectionAddress: createdTransaction.collectionAddress, tokenId: createdTransaction.tokenId}, {
                    $push: {transactions: createdTransaction._id}
                }, {new: true})
                .then((updatedNft) => {
                    console.log(updatedNft);
                    Transaction.findByIdAndUpdate(createdTransaction._id, {
                        $set: {nftTokenObject: updatedNft._id}
                    }, {new: true})
                    .then((updatedTransaction) => {
                        console.log(updatedTransaction);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    await findNftTransactions();
    //return recentTransactionBlock;
    await Collection.findOneAndUpdate({ nftName: "Moonbird"}, {
        $set: {recentTranBlock: recentTransactionBlock}
    }, {new: true})
        .then((updatedCollection) => {
            console.log("UPDATED BLOCKNUMBER:", updatedCollection.recentTranBlock);
        })
        .catch((err) => {
            console.log(err);
        })

}

// Moonbirds();

module.exports = Moonbirds;
