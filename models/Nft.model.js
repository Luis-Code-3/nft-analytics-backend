const { Schema, model } = require("mongoose");

const nftSchema = new Schema(
  {
    nftName: {
    type: String,
    required: true,
    },
    tokenId: {
      type: String,
      required: true,
    },
    fromCollectionName: {
      type: String,
      required: true,
    },
    fromCollection: {type: Schema.Types.ObjectId, ref: "Collection"},
    imageUrl: {
      type: String,
      required: true,
    },
    collectionAddress: {
      type: String,
      required: true,
    },
    transactions: [{type: Schema.Types.ObjectId, ref: "Transactions"}]
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const Nft = model("Nft", nftSchema);

module.exports = Nft;