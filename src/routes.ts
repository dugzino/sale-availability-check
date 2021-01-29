import express from 'express';

const app = express();
const PORT = 8000;

app.get('/', async (req, res) => {
  const { article, website } = req.query;
  res.send('Express + TypeScript Server');
});
app.post('/', (req, res) => res.send('Ummm... What?'));
app.listen(PORT, () => { console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`); });
