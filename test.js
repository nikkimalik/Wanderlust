require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.ATLASDB_URL)
.then(() => {
    console.log("CONNECTED");
    process.exit(0);
})
.catch((err) => {
    console.error("ERROR:", err);
    process.exit(1);
});