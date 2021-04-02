import React from 'react';
import { CoursePart } from '../../types';

interface props {
  coursePart: CoursePart;
}

const ContentItem: React.FC<props> = ({ coursePart }: props) => {
  const { name, exerciseCount } = coursePart;
  return (
    <p>
      {name} {exerciseCount}
    </p>
  );
};

export default ContentItem;
