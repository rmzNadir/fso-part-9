import React from 'react';
import { Message, Icon } from 'semantic-ui-react';
import { HospitalEntry as HospitalEntryType } from '../types';
import DiagnosesList from './DiagnosesList';

interface props {
  entry: HospitalEntryType;
}

const HospitalEntry: React.FC<props> = ({
  entry: { date, description, diagnosisCodes, discharge },
}) => {
  return (
    <Message>
      <div>
        <h3>
          <strong> {date}</strong> <Icon name='hospital' size='big' />
        </h3>
        <p>
          <i style={{ color: '#5f5f5f' }}>{description}</i>
        </p>
        {discharge && (
          <>
            <h4>Sick leave</h4>
            <div>
              <strong>Date: </strong>
              {discharge?.date}
            </div>
            <div>
              <strong>Criteria: </strong>
              {discharge?.criteria}
            </div>
          </>
        )}
        {diagnosisCodes && <DiagnosesList diagnosisCodes={diagnosisCodes} />}
      </div>
    </Message>
  );
};

export default HospitalEntry;
