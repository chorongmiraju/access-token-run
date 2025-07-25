const express = require('express');
const { GoogleAuth } = require('google-auth-library');

const app = express();
const PORT = process.env.PORT || 8080;

// 헬스체크 엔드포인트
app.get('/', (req, res) => {
  res.send('OK');
});

// 토큰 발급 엔드포인트
app.get('/token', async (req, res) => {
  try {
    const auth = new GoogleAuth({
      scopes: 'https://www.googleapis.com/auth/cloud-platform'
    });
    const client = await auth.getClient();
    const { token } = await client.getAccessToken();
    res.json({ access_token: token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
