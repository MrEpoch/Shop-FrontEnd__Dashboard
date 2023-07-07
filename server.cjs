const express = require('express');
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(5736, () => {
    console.log("Server running on port 5736");
});
