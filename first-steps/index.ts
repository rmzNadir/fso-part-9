import express from 'express';
import calculateBmi from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const queries = Object.keys(req.query);
  if (queries.length < 2) {
    res.json({ status: 400, msg: 'Missing parameters' });
  }
  if (queries.length > 2) {
    res.json({ status: 400, msg: 'Too many parameters' });
  }
  const validParams = ['height', 'weight'];
  let notRecognized: String[] = [];
  queries.forEach(
    (q) => !validParams.includes(q) && (notRecognized = [...notRecognized, q])
  );

  if (notRecognized.length > 0) {
    res.json({
      status: 400,
      msg: 'Malformatted parameters',
      invalidParameters: notRecognized,
    });
  }

  if (req.query.weight && req.query.height) {
    const bmi = calculateBmi(+req.query.height, +req.query.weight);

    res.json({
      status: 200,
      weight: +req.query.weight,
      height: +req.query.height,
      bmi,
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
