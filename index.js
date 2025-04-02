const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

app.get('/signature', (req, res) => {
  const apiKey = process.env.API_KEY;
  const apiSecret = process.env.API_SECRET;

  if (!apiKey || !apiSecret) {
    return res.status(400).json({ error: 'Missing API credentials' });
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const raw = apiKey + timestamp + apiSecret;
  const signature = crypto.createHash('sha256').update(raw).digest('hex');

  res.json({
    t: timestamp,
    api_signature: signature
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Signature generator running on port ${port}`);
});
