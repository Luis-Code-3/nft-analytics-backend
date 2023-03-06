const { Schema, model } = require("mongoose");

const collectionSchema = new Schema(
  {
    collectionName: {
    type: String,
    required: true,
    unique: true
    },
    nftName: {
    type: String,
    required: true,
    unique: true
    },
    logoUrl: {
    type: String,
    required: true,
    unique: true
    },
    tokenSupply: {
    type: String,
    required: true,
    unique: true
    },
    contractAddress: {
    type: String,
    required: true,
    unique: true
    },
    description: {
    type: String,
    required: true,
    unique: true
    },
    opensea: {
    type: String,
    required: true,
    unique: true
    },
    twitter: {
    type: String,
    required: true,
    unique: true
    },
    website: {
    type: String,
    required: true,
    unique: true
    },
    etherscan: {
    type: String,
    required: true,
    unique: true
    },
    recentTranBlock: {
    type: String
    },
    tokens: [{type: Schema.Types.ObjectId, ref: "Nft"}],
    transactions: [{type: Schema.Types.ObjectId, ref: "Transaction"}]
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const Collection = model("Collection", collectionSchema);

module.exports = Collection;