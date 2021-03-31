import { NewPatient, Gender } from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (str: any): str is Gender => {
  return Object.values(Gender).includes(str);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('malformated or missing name: ' + name);
  }

  return name;
};

const parseSSN = (SSN: unknown): string => {
  if (!SSN || !isString(SSN)) {
    throw new Error('malformated or missing SSN: ' + SSN);
  }

  return SSN;
};

const parseBirth = (birth: unknown): string => {
  if (!birth || !isString(birth) || !isDate(birth)) {
    throw new Error('Incorrect or missing birth: ' + birth);
  }

  return birth;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('malformated or missing occupation: ' + occupation);
  }

  return occupation;
};

const parseGender = (gender: unknown): string => {
  if (!gender || !isGender(gender)) {
    throw new Error('malformated or missing gender: ' + gender);
  }

  return gender;
};

type Fields = {
  name: unknown;
  ssn: unknown;
  dateOfBirth: unknown;
  occupation: unknown;
  gender: unknown;
};

export const toNewPatient = ({
  name,
  ssn,
  dateOfBirth,
  occupation,
  gender,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    ssn: parseSSN(ssn),
    dateOfBirth: parseBirth(dateOfBirth),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender),
  };

  return newPatient;
};

export default {
  toNewPatient,
};
