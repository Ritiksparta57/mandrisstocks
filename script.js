let b = document.querySelector('body');
class StockAPI {
  constructor() {
    this.baseURL0 = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=RELIANCE.BSE&outputsize=full&apikey=demo';
    this.baseURL1='https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo';
    this.baseURL2='https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TCS.BSE&outputsize=full&apikey=M8FLJ3MIB076L17N';
    this.stockGrid = document.getElementById('videoGrid');
  }
  async fetchStockData0(index) {
    try {
      let response;
      if (index == 0) {
        response = await fetch(this.baseURL0);
      } else if (index == 1) {
        response = await fetch(this.baseURL1);
      } else if (index == 2) {
        response = await fetch(this.baseURL2);
      }
      else if(index == 3){
        response=await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=M8FLJ3MIB076L17N');
      }
     else if(index ==4) {
       response =await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=META&apikey=M8FLJ3MIB076L17N')
     }
      else if(index ==5){
         response =await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GOOGL&apikey=M8FLJ3MIB076L17N')
      }
      else if( index ==6){
         response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GS&apikey=M8FLJ3MIB076L17N')
      }
      else if(index ==7){
        response= await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=INFY&apikey=M8FLJ3MIB076L17N')
      }
      else if(index ==8 ){
        response =await fetch ('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NIFTY&apikey=M8FLJ3MIB076L17N')

      }
      else if( index==9){
        response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SNX&apikey=M8FLJ3MIB076L17N')
      }
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
          <div style="color:green" class="video-meta"><strong>Open:</strong> ₹${parseFloat(stock.open).toFixed(2)}</div>
          <div style="color:blue"class="video-meta"><strong>High:</strong> ₹${parseFloat(stock.high).toFixed(2)}</div>
          <div style="color:blue" class="video-meta"><strong>Low:</strong> ₹${parseFloat(stock.low).toFixed(2)}</div>
          <div style="color:red" class="video-views"><strong>Close:</strong> ₹${parseFloat(stock.close).toFixed(2)}</div>
          <div class="video-views"><strong>Volume:</strong> ${parseInt(stock.volume).toLocaleString()}</div>
        </div>
      </div>
    `;
  }

  renderStocks(stocks) {
    if (!this.stockGrid) {
      console.error('Stock grid element not found');
      return;
    }
    
    if (stocks.length === 0) {
      this.stockGrid.innerHTML = '<div class="error">No stock data available</div>';
      return;
    }
    
    this.stockGrid.innerHTML = stocks.map(stock => this.createStockCard(stock)).join('');
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
  "Nifty 50",
  "Sensex",
  "Mitsubishi UFJ Financial Group",
  "Tata Motors Ltd."
];

let search = document.getElementsByClassName('search-input')[0];
let list = document.createElement('ul');
list.className = 'sl';
list.style.display = 'none';
search.parentNode.appendChild(list);

function updatelist(query) {
  list.innerHTML = '';
  const filtered = sn
    .map((item, index) => ({ item, index }))
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
