// script.js

document.getElementById("sortByMktCap").addEventListener("click", () => {
    sortByMarketCap();
});

document.getElementById("sortByPercent").addEventListener("click", () => {
    sortByPercentageChange();
});

document.getElementById("search").addEventListener("input", () => {
    filterTable();
});

async function sortByMarketCap() {
    try {
        const request = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
        const data = await request.json();

        // Sort data by market cap in descending order
        data.sort((a, b) => b.market_cap - a.market_cap);

        displayData(data);
    } catch (e) {
        console.log("Error fetching data: ", e);
    }
}

async function sortByPercentageChange() {
    try {
        const request = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
        const data = await request.json();

        // Sort data by percentage change in descending order
        data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);

        displayData(data);
    } catch (e) {
        console.log("Error fetching data: ", e);
    }
}

function displayData(data) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = tableBody.insertRow();
        let n = item.price_change_percentage_24h;

        let textcolor = n < 0 ? 'red' : 'green';

        // console.log(typeof n);
        row.innerHTML = `<tr>
            <td class="name"><img src="${item.image}"> ${item.name}</td>
            <td class="symbol">${item.symbol}</td>
            <td class="currCap">$${item.current_price}</td>
            <td class="priceChange" style:"color : ${textcolor}">${item.price_change_percentage_24h}%</td>
            <td class="totalVolume">$${item.total_volume}</td>
            <td class="mktCap">${item.market_cap}</td>
        </tr>`;
    });
}

// Initial fetch and display
fetchData();


async function fetchData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function filterTable() {
    const searchText = document.getElementById("search").value.toLowerCase();

    const filteredData = cryptoData.filter(
        (crypto) =>
            crypto.name.toLowerCase().includes(searchText) ||
            crypto.symbol.toLowerCase().includes(searchText)
    );

    displayData(filteredData);
}