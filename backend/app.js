const express = require("express");
const komentari = require("./komentari");
const history = require("connect-history-api-fallback");
const path = require("path");

const app = express();

app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
    );
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use("/api", komentari);

const staticMiddleware = express.static(path.join(__dirname, "dist"));

app.use(staticMiddleware);
app.use(history());
app.use(staticMiddleware);

app.listen(8000);
