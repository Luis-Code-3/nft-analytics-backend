const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    buyer: {
    type: String,
    required: true,
    },
    seller: {
      type: String,
      required: true,
    },
    tokenName: {
      type: String,
      required: true,
    },
    tokenId: {
      type: String,
      required: true,
    },
    nftTokenObject: {type: Schema.Types.ObjectId, ref: "Nft"},
    salePriceEth: {
      type: String,
      required: true,
    },
    salePriceUSD: {
      type: String,
    },
    transactionTimeStamp: {
      type: String,
      required: true,
    },
    blockNumber: {
      type: String,
      required: true,
    },
    transactionHash: {
      type: String,
      required: true,
    },
    collectionAddress: {
      type: String,
      required: true,
    }
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;