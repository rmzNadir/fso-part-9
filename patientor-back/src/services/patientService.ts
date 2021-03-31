import patientsData from '../../data/patients.json';
import { Patient, NewPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

// const patients: Patient[] = patientsData as Patient[];

export const getPatients = (): Omit<Patient, 'ssn'>[] => {
  return patientsData.map(({ ssn, ...p }) => {
    ssn;
    return p;
  });
};

export const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    // eslint-disable-next-line
    id: uuidv4(),
    ...patient,
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
};
