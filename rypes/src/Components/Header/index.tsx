import React from 'react';

interface props {
  courseName: string;
}

const index: React.FC<props> = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};

export default index;
