interface BmiCalcInput {
  height: number;
  weight: number;
}

const parseBMIArguments = (args: Array<string>): BmiCalcInput => {
  if (args.length < 4) throw new Error('Missing arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Both of the values must be numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const BMI: number = weight / Math.pow(height / 100, 2);

  switch (true) {
    case BMI < 15:
      return 'Very severely underweight';
    case BMI > 15 && BMI <= 16:
      return 'Severely underweight';
    case BMI > 16 && BMI <= 18.5:
      return 'Underweight';
    case BMI > 18.5 && BMI <= 25:
      return 'Normal (healthy weight)';
    case BMI > 25 && BMI <= 30:
      return 'Overweight';
    case BMI > 30 && BMI <= 35:
      return 'Obese Class I (Moderately obese)	';
    case BMI > 35 && BMI <= 40:
      return 'Obese Class II (Severely obese)';
    case BMI > 40:
      return 'Obese Class III (Very severely obese)	';
    default:
      return 'Something went wrong...';
  }
};

try {
  const { height, weight } = parseBMIArguments(process.argv);
  const result = calculateBmi(height, weight);
  console.log(result);
} catch (e) {
  console.log('Error: ', e.message);
}

export default calculateBmi;
