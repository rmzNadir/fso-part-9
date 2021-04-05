import React from 'react';
import { Message, Icon } from 'semantic-ui-react';
import DiagnosesList from './DiagnosesList';

import { HealthCheckEntry as HealthCheckEntryType } from '../types';

interface props {
  entry: HealthCheckEntryType;
}

const HealthCheckEntry: React.FC<props> = ({
  entry: { date, description, healthCheckRating, diagnosisCodes },
}) => {
  const getColor = () => {
    switch (healthCheckRating) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      case 3:
        return 'red';
      default:
        return 'grey';
    }
  };

  return (
    <Message>
      <div>
        <h3>
          <strong> {date}</strong> <Icon name='user doctor' size='big' />
        </h3>
        <p>
          <i style={{ color: '#5f5f5f' }}>{description}</i>
        </p>
        {diagnosisCodes && <DiagnosesList diagnosisCodes={diagnosisCodes} />}
        <div>
          <Icon name='heart' color={getColor()} />
        </div>
      </div>
    </Message>
  );
};

export default HealthCheckEntry;
