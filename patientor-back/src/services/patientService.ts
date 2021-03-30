import patientsData from '../../data/patients.json';
import { Patient } from '../types';

// const patients: Patient[] = patientsData as Patient[];

export const getPatients = (): Omit<Patient, 'ssn'>[] => {
  return patientsData.map(({ ssn, ...p }) => {
    ssn;
    return p;
  });
};

export default {
  getPatients,
};
