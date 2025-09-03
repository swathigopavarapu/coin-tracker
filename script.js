const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
let cryptoData = [];

// Fetch data using .then
function fetchWithThen() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      cryptoData = data;
      renderTable(data);
    })
    .catch(error => console.error("Error:", error));
}

// Fetch data using async/await
async function fetchWithAsync() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    cryptoData = data;
    renderTable(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Render table rows dynamically
function renderTable(data) {
  const tbody = document.querySelector("#cryptoTable tbody");
  tbody.innerHTML = "";
  data.forEach(coin => {
    const row = `
      <tr>
        <td><img src="${coin.image}" alt="${coin.name}"></td>
        <td>${coin.name}</td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td>$${coin.current_price.toLocaleString()}</td>
        <td>${coin.total_volume.toLocaleString()}</td>
        <td>${coin.market_cap.toLocaleString()}</td>
        <td style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
          ${coin.price_change_percentage_24h.toFixed(2)}%
        </td>
      </tr>`;
    tbody.innerHTML += row;
  });
}

// Search functionality
function searchData() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = cryptoData.filter(
    coin => coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query)
  );
  renderTable(filtered);
}

// Sort by Market Cap
function sortByMarketCap() {
  const sorted = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
  renderTable(sorted);
}

// Sort by % Change
function sortByChange() {
  const sorted = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  renderTable(sorted);
}

// Load initial data
fetchWithAsync(); // you can also try fetchWithThen()
