import React from 'react';
import { CoursePart } from '../../types';
import { assertNever } from '../../utils';

interface props {
  coursePart: CoursePart;
}

const ContentItem: React.FC<props> = ({ coursePart }: props) => {
  switch (coursePart.type) {
    case 'normal':
      return (
        <p>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <div>
            <i>{coursePart.description}</i>
          </div>
        </p>
      );
    case 'groupProject':
      return (
        <p>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
        </p>
      );
    case 'submission':
      return (
        <p>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <div>
            <i>{coursePart.description}</i>
          </div>
          submit to {coursePart.exerciseSubmissionLink}
        </p>
      );
    case 'special':
      return (
        <p>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <div>
            <i>{coursePart.description}</i>
          </div>
          Required skills: {coursePart.requirements.join(', ')}
        </p>
      );

    default:
      return assertNever(coursePart);
  }
};

export default ContentItem;
