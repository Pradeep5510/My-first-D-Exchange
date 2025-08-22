async function swap() {
    const token1 = document.getElementById("token1").value;
    const token2 = document.getElementById("token2").value;
    const amount = document.getElementById("amount").value;
    const resultDiv = document.getElementById("result");

    if (!amount || amount <= 0) {
        resultDiv.innerText = "Please enter a valid amount.";
        return;
    }

    try {
        let response;

        // ETH → USDC (selling ETH)
        if (token1 === "eth" && token2 === "usdc") {
            response = await fetch("http://localhost:3000/sell-asset", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantity: parseFloat(amount) })
            });
        } 
        // USDC → ETH (buying ETH)
        else if (token1 === "usdc" && token2 === "eth") {
            response = await fetch("http://localhost:3000/buy-asset", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantity: parseFloat(amount) })
            });
        } 
        else {
            resultDiv.innerText = "Invalid swap (same token).";
            return;
        }

        const data = await response.json();
        resultDiv.innerText = data.message;

    } catch (err) {
        console.error("Error swapping:", err);
        resultDiv.innerText = "Error connecting to backend.";
    }
}

// Function to fetch updated balances
async function fetchBalances() {
    try {
        const response = await fetch("http://localhost:3000/updatedBalance");
        const data = await response.json();
        console.log("Pool Status:", data);
    } catch (err) {
        console.error("Error fetching balances:", err);
    }
}
