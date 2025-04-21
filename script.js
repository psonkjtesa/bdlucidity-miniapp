const pricesDiv = document.getElementById("prices");
const responseDiv = document.getElementById("response");

async function loadPrices() {
  pricesDiv.innerText = "Loading...";
  const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true");
  const data = await res.json();
  pricesDiv.innerHTML = `
    BTC: $${data.bitcoin.usd} (${data.bitcoin.usd_24h_change.toFixed(2)}%)<br>
    ETH: $${data.ethereum.usd} (${data.ethereum.usd_24h_change.toFixed(2)}%)
  `;
}

async function sendMessage() {
  const input = document.getElementById("userInput").value;
  responseDiv.innerText = "Thinking...";
  
  const res = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_HF_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: input })
  });

  const result = await res.json();
  responseDiv.innerText = result[0]?.generated_text || "No response";
}

function buyPremium() {
  Telegram.WebApp.showAlert("Stars purchase feature coming soon via Telegram.");
}