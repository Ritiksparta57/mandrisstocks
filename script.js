         const indexmap={
  0:"NVIDIA",
  1:"IBM Corp.",  
  2:"Tata Consultancy Services Ltd.",
  3:"Microsoft Corp.",
  4:"Meta Platforms Inc.",
  5:"Alphabet Inc.",
  6:"Goldman Sachs Group Inc.",
  7:"Infosys Ltd.",
  8:"Apple Inc.",
  9:"JP Morgan Chase & Co.",
  10:"Adani powers ltd.",
  11:"Tesla Inc.",
  12:"Bitcoin",
  13:"Amazon.com Inc.",
  14:"HCL Technologies Ltd.",
  15:"Zomato Ltd.",
};
class StockAPI {
  constructor() {
    this.stockGrid = document.getElementById('videoGrid');
  }
  async fetchStockData0(index) {
    try {
       const companyName = indexmap[index];
    let symbol;
    switch (companyName) {
      case "NVIDIA":
        symbol = "NVDA";
        break;
      case "IBM Corp.":
        symbol = "IBM";
        break;
      case "Tata Consultancy Services Ltd.":
        symbol = "TCS.BSE";
        break;
      case "Microsoft Corp.":
        symbol = "MSFT";
        break;
      case "Meta Platforms Inc.":
        symbol = "META";
        break;
      case "Alphabet Inc.":
        symbol = "GOOGL";
        break;
      case "Goldman Sachs Group Inc.":
        symbol = "GS";
        break;
      case "Infosys Ltd.":
        symbol = "INFY";
        break;
      case "Apple Inc.":
        symbol = "AAPL";  
        break;
      case "JP Morgan Chase & Co.":
        symbol = "JPM"; 
        break;
      case "Adani powers ltd.":
        symbol = "ADANIPOWER.BSE";
        break;
      case "Tesla Inc.":
        symbol = "TSLA";
        break;
        case "Bitcoin":
        symbol = "BTC-USD";
        break;
        case "Amazon.com Inc.": 
        symbol = "AMZN";
        break;
        case "HCL Technologies Ltd.":
        symbol = "HCLTECH.BSE"; 
        break;
      case "Zomato Ltd.":
        symbol = "ZOMATO.NS";
        break;  
      default:
        throw new Error(`Unknown company: ${companyName}`);
    }
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=M8FLJ3MIB076L17N`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return this.transformData(data);
    } catch (error) {
      console.error('Failed to fetch stock data:', error);
      return this.generateMockData();
    }
    }
  
  transformData(data) {
    const series = data["Time Series (Daily)"];
    if (!series) {
      console.log('No time series data found, using mock data');
      return this.generateMockData();
    }

    return Object.entries(series).slice(0, 8).map(([date, values]) => ({
      date,
      open: values["1. open"],
      high: values["2. high"],
      low: values["3. low"],
      close: values["4. close"],
      volume: values["5. volume"]
    }));
  }

  generateMockData() {
    const mockData = [];
    const today = new Date();
    
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      const basePrice = 150;
      const open = basePrice + (Math.random() - 0.5) * 10;
      const close = open + (Math.random() - 0.5) * 15;
      const high = Math.max(open, close) + Math.random() * 5;
      const low = Math.min(open, close) - Math.random() * 5;
      const volume = Math.floor(Math.random() * 1000000) + 500000;
      
      mockData.push({
        date: date.toISOString().split('T')[0],
        open: open.toFixed(2),
        high: high.toFixed(2),
        low: low.toFixed(2),
        close: close.toFixed(2),
        volume: volume.toString()
      });
    }
    
    return mockData;
  }

  createStockCard(stock) {
    return `
      <div class="video-card">
        <div class="video-info">
          <div class="video-title">${stock.date}</div>
          <div style="color:green" class="video-meta"><strong>Open:</strong> $${parseFloat(stock.open).toFixed(2)}</div>
          <div style="color:blue"class="video-meta"><strong>High:</strong> $${parseFloat(stock.high).toFixed(2)}</div>
          <div style="color:blue" class="video-meta"><strong>Low:</strong> $${parseFloat(stock.low).toFixed(2)}</div>
          <div style="color:red" class="video-views"><strong>Close:</strong> $${parseFloat(stock.close).toFixed(2)}</div>
          <div class="video-views"><strong>Volume:</strong> ${parseInt(stock.volume).toLocaleString()}</div>
        </div>
      </div>
    `;
  }
drawChart(stocks) {
  const ctx = document.getElementById('stockChart').getContext('2d');

  const labels = stocks.map(s => s.date).reverse();
  const prices = stocks.map(s => parseFloat(s.close)).reverse();
   new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Closing Price',
        data: prices,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3,
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Price (₹)'
          }
        }
      }
    }
  });
}
renderStocks(stocks){
    if (!this.stockGrid) {
      console.error('Stock grid element not found');
      return;
    }
  if (!stocks || stocks.length === 0) {
    this.stockGrid.innerHTML = '<div class="loading">No stock data available.</div>';
    return;
  }
  this.stockGrid.innerHTML = '';
const wrapper = document.createElement('div');
wrapper.style.display = 'flex';
wrapper.style.flexDirection = 'column';
wrapper.style.gap = '30px';
wrapper.style.width ='75vw' ;
wrapper.style.boxSizing = 'border-box';
const canvas = document.createElement('canvas');
canvas.id = 'stockChart';
// canvas.style.width = '300px';
// canvas.style.height = '400px';
wrapper.appendChild(canvas);
const cardsHTML = stocks.map(stock => this.createStockCard(stock)).join('');
const cardContainer = document.createElement('div');
cardContainer.innerHTML = cardsHTML;
wrapper.appendChild(cardContainer);
this.stockGrid.appendChild(wrapper);
this.drawChart(stocks); 
}

  async init(index) {
    if (this.stockGrid) {
      this.stockGrid.innerHTML = '<div class="loading">Loading stock data...</div>';
    }
    const stocks = await this.fetchStockData0(index);
    this.renderStocks(stocks);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const stockGrid = document.getElementById('videoGrid');
  document.querySelectorAll('.sidebar-item').forEach(function(button, index) {
    button.addEventListener('click', function() {
      xyz(button, index);
      opac(button);
    });
  });
});
function xyz(button, index) {
  console.log(button);
  console.log(index);
  const stockAPI = new StockAPI();
  stockAPI.init(index);
}
function opac(button) {
  document.querySelectorAll('.sidebar-item').forEach(btn => {
    btn.classList.remove('active');
  });
  button.classList.add('active');
}
const sn = [
  "Apple Inc.",
  "JP Morgan Chase & Co.",
  "Adani powers ltd.",
  "Tesla Inc.",
  "Bitcoin",
  "Amazon.com Inc.",
  "HCL Technologies Ltd.",
  "Zomato Ltd.",
];
let baseindex=8;
let search = document.getElementsByClassName('search-input')[0];
let list = document.createElement('ul');
list.className = 'sl';
list.style.display = 'none';
search.parentNode.appendChild(list);

function updatelist(query) {
  list.innerHTML = '';
  const filtered = sn
    .map((item, i) => ({ item,index: baseindex+i }))
    .filter(obj => obj.item.toLowerCase().includes(query));

  filtered.forEach(({ item, index }) => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
    li.addEventListener('click', () => {
      search.value = item;
      list.innerHTML = '';
      list.style.display = 'none';
     const stockAPI = new StockAPI();
    stockAPI.init(index);
});
li.removeEventListener('click',()=>{
  search.value=item;
  list.innerHTML='';
  list.style.display='block';
});
  });
}

search.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  if (query === '') {
    list.innerHTML = '';
    list.style.display = 'none';
  } else {
    updatelist(query);
    list.style.display = 'block';
  }
});
