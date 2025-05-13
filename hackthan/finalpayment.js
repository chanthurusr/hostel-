const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>UPI Payment</title>
        </head>
        <body>
            <h1>Pay with UPI</h1>
            <form id="payment-form">
                <label for="upiId">UPI ID:</label>
                <input type="text" id="upiId" name="upiId" required>
                <br>
                <label for="amount">Amount:</label>
                <input type="number" id="amount" name="amount" required>
                <br>
                <button type="submit">Pay</button>
            </form>

            <p id="response-message"></p>

            <script>
                document.getElementById('payment-form').addEventListener('submit', function (event) {
                    event.preventDefault();
                    const upiId = document.getElementById('upiId').value;
                    const amount = document.getElementById('amount').value;

                    fetch('/pay', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ upiId, amount })
                    })
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('response-message').innerText = data.message;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        document.getElementById('response-message').innerText = 'Payment failed';
                    });
                });
            </script>
        </body>
        </html>
    `);
});

// Route to handle UPI payment
app.post('/pay', (req, res) => {
    const { upiId, amount } = req.body;
    // Here, you would typically call your UPI payment gateway's API
    // For demonstration, we'll just send a success response
    if (upiId && amount) {
        res.send({ status: 'success', message: 'Payment initiated', upiId, amount });
    } else {
        res.status(400).send({ status: 'failure', message: 'Invalid parameters' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
