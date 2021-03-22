interface Rating {
  value: number;
  description: string;
}

interface ExercisesInfo {
  periodLength: number;
  trainingDays: number;
  success: Boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseCalcInput {
  target: number;
  hoursPerDay: number[];
}

const parseExerciseArguments = (args: Array<string>): ExerciseCalcInput => {
  if (args.length < 12) throw new Error('Missing arguments');
  if (args.length > 12) throw new Error('Too many arguments');

  const hoursPerDay = args
    .splice(3)
    .map((i) => Number(i))
    .flat();

  if (!isNaN(Number(args[2])) && !hoursPerDay.some((a) => isNaN(a))) {
    return {
      target: Number(args[2]),
      hoursPerDay: hoursPerDay,
    };
  } else {
    throw new Error('Every value must be a number!');
  }
};

const calculateExercises = (
  hoursPerDay: number[],
  target: number
): ExercisesInfo => {
  if (hoursPerDay.length === 0) {
    throw new Error('There must be at least 1 day of exercise recorded!');
  }

  const periodLength = hoursPerDay.length;
  const trainingDays = hoursPerDay.filter(Boolean).length;
  const average = hoursPerDay.reduce((acc, cV) => acc + cV) / periodLength;
  const success = average >= target ? true : false;

  const getRating = (avg: number, target: number): Rating => {
    switch (true) {
      case avg >= target * 1.5:
        return { value: 5, description: 'AWESOME JOB!!!' };
      case avg >= target * 1.25 && avg < target * 1.5:
        return { value: 4, description: 'Great job!' };
      case avg >= target && avg < target * 1.25:
        return { value: 3, description: 'You got it!' };
      case avg >= target * 0.8 && avg < target:
        return { value: 2, description: 'Try harder, you can do it!' };
      case avg < target * 0.8:
        return { value: 1, description: 'Did you even try? lol.' };
    }
  };

  const rating: Rating = getRating(average, target);

  return {
    periodLength,
    trainingDays,
    success,
    rating: rating.value,
    ratingDescription: rating.description,
    target,
    average,
  };
};

try {
  const { target, hoursPerDay } = parseExerciseArguments(process.argv);
  const result = calculateExercises(hoursPerDay, target);
  console.log(result);
} catch (e) {
  console.log('Error: ', e.message);
}
