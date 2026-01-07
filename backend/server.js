import express from 'express';
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend running' });
});

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' });
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
