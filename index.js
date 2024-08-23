import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

const BASE_URL = "https://v6.exchangerate-api.com/v6/";
const API_KEY = process.env.EXCHANGE_RATE_API_KEY;

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.post("/reset", (req, res) => {
    res.redirect("/")
});

app.post("/submit", async (req, res) => {
    const yourCountry = (req.body["yourCountry"]);
    const foreignCountry = (req.body["foreignCountry"]);

    const yourAmount = parseInt(req.body["yourAmount"]);  

    const baseAmount = 1;
    const baseCurrency = currencySymbol(yourCountry);

  
    const exchangeCurrency = currencySymbol(foreignCountry);

    try {
        const response = await axios.get(BASE_URL + API_KEY + "/pair/" + baseCurrency + "/" + exchangeCurrency + "/" + yourAmount);
        // const result2 = JSON.stringify(response.data);
        const result = response.data;
        const exchangeValue = result["conversion_rate"];
        const foreignAmount = result["conversion_result"];
        // console.log(result2);
        // console.log(exchangeValue);
        // console.log(foreignAmount);
        res.render("index.ejs", {
            yourCountry: yourCountry,
            foreignCountry: foreignCountry,
            yourAmount: yourAmount,
            foreignAmount: foreignAmount,
            baseAmount: baseAmount,
            baseCurrency: baseCurrency,
            exchangeValue: exchangeValue,
            exchangeCurrency: exchangeCurrency,
        });
    } catch (error) {
        res.status(404).send(error.message);
    }
});






// Calculate value of foreign currency given base currency and exchange rate
// function calculateCurrency(initialAmount, exchangeRate) {
//     const newAmount = initialAmount * exchangeRate
//     return newAmount
// };

// Extract currency code from user selection in dropdown
function currencySymbol(country) {
    const item = country.slice(-5);
    const currency = item.slice(0, 3);
    return currency
}


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});