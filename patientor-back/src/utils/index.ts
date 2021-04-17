import {
  NewPatient,
  Gender,
  NewBaseEntry,
  Diagnosis,
  Entries,
  NewEntry,
  Discharge,
  SickLeave,
  HealthCheckRating,
} from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: unknown): boolean => {
  if (!isString(date)) return false;
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

const parseString = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error('malformated or missing property: ' + string);
  }

  return string;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing property: ' + date);
  }

  return date;
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis['code']> => {
  if (!codes || !Array.isArray(codes) || codes.some((c) => !isString(c))) {
    throw new Error('Invalid or malformatted code(s): ' + codes);
  }
  return codes as Array<Diagnosis['code']>;
};

const isEntryType = (type: Entries): type is Entries => {
  return Object.values(Entries).includes(type);
};

const parseEntryType = (type: unknown): Entries => {
  if (!type || !isString(type) || !isEntryType(type as Entries)) {
    throw new Error('Incorrect or missing property: ' + type);
  }
  return type as Entries;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = ({ date, criteria }: any): boolean => {
  // in '!!date' the first ! turns the expression into boolean
  // and the second ! evaluates said boolean expression
  // this helps avoid the "Unsafe return of an any typed value" error
  return !!date && !!criteria && isDate(date) && isString(criteria);
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing property: ' + discharge);
  }

  return discharge as Discharge;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = ({ startDate, endDate }: any): boolean => {
  // in '!!date' the first ! turns the expression into boolean
  // and the second ! evaluates said boolean expression
  // this helps avoid the "Unsafe return of an any typed value" error
  return !!startDate && !!endDate && isDate(startDate) && isDate(endDate);
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing property: ' + sickLeave);
  }

  return sickLeave as SickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (healthCheckRating: any) => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing property: ' + healthCheckRating);
  }

  return healthCheckRating as HealthCheckRating;
};

interface NewPatientFields {
  name: unknown;
  ssn: unknown;
  dateOfBirth: unknown;
  occupation: unknown;
  gender: unknown;
  entries: [];
}

export const toNewPatient = ({
  name,
  ssn,
  dateOfBirth,
  occupation,
  gender,
  entries,
}: NewPatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    ssn: parseSSN(ssn),
    dateOfBirth: parseBirth(dateOfBirth),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender),
    entries: entries,
  };

  return newPatient;
};

//sets unknown type to every value inside the object
interface NewEntryFields {
  [key: string]: unknown;
}

export const toNewBaseEntry = ({
  // Only destructure the known required fields
  description,
  type,
  date,
  specialist,
  ...rest
}: NewEntryFields): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    description: parseString(description),
    type: parseEntryType(type),
    date: parseDate(date),
    specialist: parseString(specialist),
  };

  if (rest.diagnosisCodes) {
    newBaseEntry['diagnosisCodes'] = parseDiagnosisCodes(rest.diagnosisCodes);
  }

  return newBaseEntry;
};

export const toNewEntry = (values: NewEntryFields): NewEntry => {
  const newBaseEntry = toNewBaseEntry(values) as NewEntry;

  switch (newBaseEntry.type) {
    case Entries.Hospital:
      const newHospitalEntry = {
        ...newBaseEntry,
        discharge: parseDischarge(values.discharge),
      };
      return newHospitalEntry;
    case Entries.OccupationalHealthcare:
      if (values.sickLeave) {
        const newOHEntry = {
          ...newBaseEntry,
          employerName: parseString(values.employerName),
          sickLeave: parseSickLeave(values.sickLeave),
        };
        return newOHEntry;
      }
      const newOHEntry = {
        ...newBaseEntry,
        employerName: parseString(values.employerName),
      };
      return newOHEntry;
    case Entries.HealthCheck:
      const newHealthCheckEntry = {
        ...newBaseEntry,
        healthCheckRating: parseHealthCheckRating(values.healthCheckRating),
      };
      return newHealthCheckEntry;

    default:
      return assertNever(newBaseEntry);
  }
};

export default {
  toNewPatient,
};
