import { NewEntry, NewBaseEntry, EntryFormValues, Entries } from '../types';

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isValidDate = (date: unknown): boolean => {
  if (isString(date)) {
    return isDate(date) && !!/^\d{4}-\d{2}-\d{2}$/.exec(date);
  }
  return false;
};

export const toNewEntry = (entryFormValues: EntryFormValues): NewEntry => {
  const {
    type,
    description,
    date,
    specialist,
    diagnosisCodes,
  } = entryFormValues;
  const newBaseEntry: NewBaseEntry = {
    description,
    date,
    specialist,
    diagnosisCodes,
  };

  switch (type) {
    case Entries.HealthCheck:
      return {
        ...newBaseEntry,
        type,
        healthCheckRating: entryFormValues.healthCheckRating,
      };

    case Entries.OccupationalHealthcare:
      return {
        ...newBaseEntry,
        type,
        employerName: entryFormValues.employerName,
        sickLeave: {
          startDate: entryFormValues.sickLeaveStart,
          endDate: entryFormValues.sickLeaveEnd,
        },
      };

    case Entries.Hospital:
      return {
        ...newBaseEntry,
        type,
        discharge: {
          date: entryFormValues.dischargeDate,
          criteria: entryFormValues.dischargeCriteria,
        },
      };

    default:
      return assertNever(type);
  }
};
