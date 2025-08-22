const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from public directory
app.use(express.static('public'));

// Import private modules
const ads = require('./private/ads');
const paypal = require('./private/paypal');

// API endpoint to track ad views
app.post('/api/ad-view', (req, res) => {
  const adRevenue = ads.trackView();
  paypal.processPayment(adRevenue);
  res.json({ success: true, revenue: adRevenue });
});

app.listen(port, () => {
  console.log(`Hatcoin Support running on port ${port}`);
});
