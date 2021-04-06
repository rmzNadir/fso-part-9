import patientsData from '../../data/patients';
import { Patient, NewPatient, PublicPatient, NewEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

let patients: Patient[] = patientsData;

export const getPatients = (): PublicPatient[] => {
  return patients.map(({ ssn, ...p }) => {
    ssn;
    return p;
  });
};

export const getPatientById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

export const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    // eslint-disable-next-line
    id: uuidv4(),
    ...patient,
    entries: [],
  };

  patients.push(newPatient);
  return newPatient;
};

export const addEntryToPatient = (
  patient: Patient,
  newEntry: NewEntry
): Patient => {
  const entry = { ...newEntry, id: uuidv4() };
  const updatedPatient = {
    ...patient,
    entries: [...patient.entries, entry],
  };
  patients = patients.map((p) => {
    if (p.id === updatedPatient.id) {
      return updatedPatient;
    }
    return p;
  });

  return updatedPatient;
};

export default {
  getPatients,
  addPatient,
  addEntryToPatient,
};
