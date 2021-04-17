import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon, Button } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { updatePatient } from '../state/reducer';
import { Patient, NewEntry } from '../types';

import Entries from './Entries';
import AddEntryModal from '../AddEntryModal';

const PatientPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | undefined>();

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

  const submitEntry = async (newEntry: NewEntry) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        newEntry
      );
      dispatch(updatePatient(updatedPatient));
      setShowModal(false);
      setError(undefined);
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
    <>
      <div style={{ width: '80%' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            margin: '20px 0',
          }}
        >
          <div style={{ fontWeight: 'bold', fontSize: '24px' }}>
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
          </div>

          <Button secondary onClick={() => setShowModal(true)}>
            Add entry
          </Button>
        </div>

        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        {patient.entries.length > 0 && (
          <Entries style={{ marginTop: '25px' }} entries={patient.entries} />
        )}
      </div>
      <AddEntryModal
        modalOpen={showModal}
        onSubmit={submitEntry}
        error={error}
        onClose={() => {
          setShowModal(false);
          setError(undefined);
        }}
      />
    </>
  );
};

export default PatientPage;
