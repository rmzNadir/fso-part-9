import React from 'react';

interface props {
  totalExercises: number;
}

const index: React.FC<props> = ({ totalExercises }) => {
  return <p>Number of exercises {totalExercises}</p>;
};

export default index;
