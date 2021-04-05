import React from 'react';
import { useStateValue } from '../state';
import { List } from 'semantic-ui-react';
import { Diagnosis } from '../types';

interface props {
  diagnosisCodes: Array<Diagnosis['code']>;
}

const DiagnosesList: React.FC<props> = ({ diagnosisCodes }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <List bulleted>
      {diagnosisCodes.map((c, i) => (
        <List.Item key={i}>
          {c} {diagnoses[c]?.name}
        </List.Item>
      ))}
    </List>
  );
};

export default DiagnosesList;
