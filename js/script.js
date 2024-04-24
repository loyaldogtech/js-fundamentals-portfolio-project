    // Declare variables to store the html elements
    const getDataBtn = document.getElementById('getDataBtn');
    const symbolInput = document.getElementById('symbolInput');
    const dateInput = document.getElementById('dateInput');
    const stockDataDiv = document.getElementById('stockData');
    
        // Add an event listener to the getDataBtn
    getDataBtn.addEventListener('click', function() {

        // Get the value of the symbol and date input fields
      const symbol = symbolInput.value.toUpperCase();  // Convert the symbol to uppercase
      const date = dateInput.value;
      const apiToken = process.env.STOCKDATA_API_KEY; 
      const apiUrl = `https://api.stockdata.org/v1/data/eod?symbols=${symbol}&date=${date}&api_token=${apiToken}`;
      
        // Fetch the stock data from the API
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })

        // Display the stock data on the page
        .then(data => {
          const stock = data.data[0]; // Get the first stock in the array

          // Display the stock data on the page
          stockDataDiv.innerHTML = `   
            <h2>${symbol} Stock Data for ${date}</h2>
            <p>Name: ${symbol}</p>
            <p>Open: ${stock.open}</p>
            <p>Day High: ${stock.high}</p>
            <p>Day Low: ${stock.low}</p>
            <p>Day Close: ${stock.close}</p>
            <p>Volume: ${stock.volume}</p>
          `;
        })

        // Display an error message if there is an error
        .catch(error => {
          stockDataDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        });
    });
  
  