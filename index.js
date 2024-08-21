import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.post("/submit", (req, res) => {
    const yourCountry = (req.body["yourCountry"]);
    const foreignCountry = (req.body["foreignCountry"]);
    const yourAmount = (req.body["yourAmount"]);
    const baseAmount = 1;
    const baseCurrency = (req.body["baseCurrency"]);
    // const exchangeAmount = (req.body["exchangeAmount"]);
    const exchangeCurrency = (req.body["exchangeCurrency"]);
    console.log(`Your Country: ${yourCountry}`);
    console.log(`Foreign Country: ${foreignCountry}`);
    console.log(`Your Amount: ${yourAmount}`);
    console.log(`Exchange Rate: ${baseAmount}`);
    console.log(`Exchange Currency: ${baseCurrency}`);
    console.log(`Exchange Currency: ${exchangeCurrency}`);
    console.log(process.env.PASSWORD);
    console.log(process.env.API_KEY);
    res.render("index.ejs")
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});