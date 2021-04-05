import patientsData from '../../data/patients';
import { Patient, NewPatient, PublicPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

// const patients: Patient[] = patientsData as Patient[];

export const getPatients = (): PublicPatient[] => {
  return patientsData.map(({ ssn, ...p }) => {
    ssn;
    return p;
  });
};

export const getPatientById = (id: string): Patient | undefined => {
  return patientsData.find((p) => p.id === id);
};

export const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    // eslint-disable-next-line
    id: uuidv4(),
    ...patient,
    entries: [],
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
};
