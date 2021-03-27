import express from 'express';
import calculateBmi from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const queries = Object.keys(req.query);
  if (queries.length < 2) {
    res.status(400).json({ msg: 'Missing parameters' });
  }
  if (queries.length > 2) {
    res.status(400).json({ msg: 'Too many parameters' });
  }
  const validParams = ['height', 'weight'];
  let notRecognized: string[] = [];
  queries.forEach(
    (q) => !validParams.includes(q) && (notRecognized = [...notRecognized, q])
  );

  if (notRecognized.length > 0) {
    res.status(400).json({
      msg: 'Malformatted parameters',
      invalidParameters: notRecognized,
    });
  }

  if (req.query.weight && req.query.height) {
    const bmi = calculateBmi(+req.query.height, +req.query.weight);

    res.status(200).json({
      weight: +req.query.weight,
      height: +req.query.height,
      bmi,
    });
  }
});

app.post('/exercises', (req, res) => {
  const { target, daily_exercises } = req.body || {};

  if (!target || !daily_exercises) {
    return res.status(400).json({ msg: 'Missing parameters' });
  }
  if (typeof target !== 'number') {
    return res.status(400).json({ msg: 'Target must of type number!' });
  }

  if (daily_exercises.length !== 7) {
    return res.status(400).json({ msg: 'daily_exercises requires 7 fields!' });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (daily_exercises.find((n: number | any) => typeof n !== 'number')) {
    return res.status(400).json({
      msg: 'daily_exercises info must be formed by elements of type number!',
    });
  }

  const result = exerciseCalculator(daily_exercises, target);

  return res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
