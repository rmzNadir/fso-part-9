import React from 'react';
import { useStateValue } from '../state';
import { Entry as EntryType } from '../types';

interface props {
  entry: EntryType;
}

const Entry: React.FC<props> = ({ entry: { date, description, ...rest } }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div>
      {date} <i>{description}</i>
      {rest.diagnosisCodes && (
        <ul>
          {rest.diagnosisCodes.map((c, i) => (
            <li key={i}>
              {c} {diagnoses[c]?.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Entry;
