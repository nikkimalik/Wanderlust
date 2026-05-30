//Logic for initialization 

require("dotenv").config();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({}); //if data exists, delete them first
  initData.data = initData.data.map((obj) => ({...obj, owner: "658250bcec4db9a4172a916f"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
