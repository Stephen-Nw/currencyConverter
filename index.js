import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

const BASE_URL = "https://v6.exchangerate-api.com/v6";
const API_KEY = process.env.EXCHANGE_RATE_API_KEY;

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.post("/submit", (req, res) => {
    const yourCountry = (req.body["yourCountry"]);
    const foreignCountry = (req.body["foreignCountry"]);
    const yourAmount = parseInt(req.body["yourAmount"]);
    const baseAmount = 1;
    const baseCurrency = (req.body["baseCurrency"]);
    const exchangeValue = calculateCurrency(yourAmount, 10);
    const exchangeCurrency = (req.body["exchangeCurrency"]);
    const yourCurrency = currencySymbol(yourCountry);
    const foreignCurrency = currencySymbol(foreignCountry);
    // console.log(`Your Country: ${yourCountry}`);
    // console.log(`Foreign Country: ${foreignCountry}`);
    // console.log(`Your Amount: ${yourAmount}`);
    // console.log(`Exchange Rate: ${baseAmount}`);
    // console.log(`Exchange Currency: ${baseCurrency}`);
    console.log(`Exchange Value: ${exchangeValue}`);
    console.log(`Your Currency: ${yourCurrency}`);
    console.log(`Foreign Currency: ${foreignCurrency}`);
    res.render("index.ejs")
});

// Calculate value of foreign currency given base currency and exchange rate
function calculateCurrency(initialAmount, exchangeRate) {
    const newAmount = initialAmount * exchangeRate
    return newAmount
};

// Extract currency code from user selection in dropdown
function currencySymbol(country) {
    const item = country.slice(-5);
    const currency = item.slice(0, 3);
    return currency
}


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});