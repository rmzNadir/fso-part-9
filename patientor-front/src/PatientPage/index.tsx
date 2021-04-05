import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { updatePatient } from '../state/reducer';
import { Patient } from '../types';

import Entries from './Entries';

const PatientPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const lastFetched = useRef<string>('');

  const { id } = useParams<{ id: string }>();

  const [{ patients }, dispatch] = useStateValue();

  const patient = patients[id];

  useEffect(() => {
    const getPatient = async () => {
      setIsLoading(true);
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(updatePatient(patientFromApi));
        lastFetched.current = id;
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };

    if (lastFetched.current !== id) {
      void getPatient();
    }
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!patient) {
    return (
      <div>
        <h2>Patient not found!</h2>
      </div>
    );
  }

  return (
    <div>
      {
        <h2>
          {patient.name}{' '}
          <Icon
            name={
              patient.gender === 'female'
                ? 'venus'
                : patient.gender === 'male'
                ? 'mars'
                : 'genderless'
            }
          />
        </h2>
      }
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      {patient.entries && (
        <Entries style={{ marginTop: '25px' }} entries={patient.entries} />
      )}
    </div>
  );
};

export default PatientPage;
