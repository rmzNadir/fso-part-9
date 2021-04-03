import React from 'react';
import Part from './Part';
import { CoursePart } from '../../types';

interface props {
  courseParts: CoursePart[];
}

const index: React.FC<props> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map((p, i) => (
        <Part key={i} coursePart={p} />
      ))}
    </>
  );
};

export default index;
