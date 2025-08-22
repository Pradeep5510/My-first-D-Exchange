import express from 'express';
import cors from 'cors';



const app = express();
app.use(express.json());
app.use(cors());
const port=3000;

let Eth_balance = 200; 
let USDC_balance = 700000;
let Liquidity_Pool= Eth_balance * USDC_balance;

// app.post('/addliquidity', (req, res) => {

// });

app.post('/buy-asset', (req, res) => {
    // const product = Eth_balance * USDC_balance;
    const quantity = req.body.quantity;
    const updatedEthBalance = Eth_balance - quantity;
    const updatedUSDCBalance = Eth_balance *USDC_balance/updatedEthBalance;
    const paidAmount = updatedUSDCBalance - USDC_balance;

    Eth_balance =  updatedEthBalance;
    console.log("Current Eth balance:", Eth_balance);
    USDC_balance = updatedUSDCBalance;
    console.log("currentUSDC Balance:", USDC_balance);
    console.log("Liquidity Pool:", Liquidity_Pool);

    res.json({
        message: `Asset purchased successfully. You paid ${paidAmount} USDC for ${quantity} Eth.`
    });


});

app.post('/sell-asset', (req, res) => {
    // const product = Eth_balance * USDC_balance;
    const quantity = req.body.quantity;
    const updatedEthBalance = Eth_balance + quantity;
    const updatedUSDCBalance = Eth_balance * USDC_balance/updatedEthBalance;
    const receivedAmount = USDC_balance - updatedUSDCBalance ;

    Eth_balance =  updatedEthBalance;
    console.log("Current Eth balance:", Eth_balance);
    USDC_balance = updatedUSDCBalance;
    console.log("currentUSDC Balance:", USDC_balance);
        console.log("Liquidity Pool:", Liquidity_Pool);


    res.json({
        message: `Asset sold successfully. You sold ${quantity} Eth for ${receivedAmount} USDC.`
    });

});

app.get('/updatedBalance', (req, res) => {
    res.json({
        Eth_balance,
        USDC_balance,
        Liquidity_Pool
    });

    console.log("Current Eth balance:", Eth_balance);
    console.log("currentUSDC Balance:", USDC_balance);
    console.log("Liquidity Pool:", Liquidity_Pool);


});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});