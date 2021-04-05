import React from 'react';
import { Message, Icon } from 'semantic-ui-react';
import { OccupationalHealthcareEntry as OccupationalHealthcareEntryType } from '../types';
import DiagnosesList from './DiagnosesList';

interface props {
  entry: OccupationalHealthcareEntryType;
}

const OccupationalHealthcareEntry: React.FC<props> = ({
  entry: { date, description, diagnosisCodes, sickLeave },
}) => {
  return (
    <Message>
      <div>
        <h3>
          <strong> {date}</strong> <Icon name='stethoscope' size='big' />
        </h3>
        <p>
          <i style={{ color: '#5f5f5f' }}>{description}</i>
        </p>
        {sickLeave && (
          <>
            <h4>Sick leave</h4>
            <div>
              <strong>Start: </strong>
              {sickLeave?.startDate}
            </div>
            <div>
              <strong>End: </strong>
              {sickLeave?.endDate}
            </div>
          </>
        )}
        {diagnosisCodes && <DiagnosesList diagnosisCodes={diagnosisCodes} />}
      </div>
    </Message>
  );
};

export default OccupationalHealthcareEntry;
