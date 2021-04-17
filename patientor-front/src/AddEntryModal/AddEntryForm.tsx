import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import {
  EntryTypeSelection,
  TextField,
  EntryExtraFields,
} from '../AddPatientModal/FormField';
import {
  Entries,
  NewEntry,
  EntryFormValues,
  HealthCheckRating,
} from '../types';
import { DiagnosisSelection } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { isValidDate, toNewEntry } from '../utils';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  const initialValues: EntryFormValues = {
    type: Entries.HealthCheck,
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
    dischargeDate: '',
    dischargeCriteria: '',
    employerName: '',
    sickLeaveStart: '',
    sickLeaveEnd: '',
    healthCheckRating: HealthCheckRating.Healthy,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(toNewEntry(values))}
      validate={(values) => {
        const requiredError = 'Field is required';
        const invalidError = 'Invalid input';
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!isValidDate(values.date)) {
          errors.date = invalidError;
        }
        if (values.type === Entries.HealthCheck) {
          if (!values.healthCheckRating && values.healthCheckRating !== 0) {
            errors.healthCheckRating = requiredError;
          }
        }
        if (values.type === Entries.OccupationalHealthcare) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (!values.sickLeaveStart) {
            errors.sickLeaveStartDate = requiredError;
          } else if (!isValidDate(values.sickLeaveStart)) {
            errors.sickLeaveStartDate = invalidError;
          }
          if (!values.sickLeaveEnd) {
            errors.sickLeaveEndDate = requiredError;
          } else if (!isValidDate(values.sickLeaveEnd)) {
            errors.sickLeaveEndDate = invalidError;
          }
        }
        if (values.type === Entries.Hospital) {
          if (!values.dischargeDate) {
            errors.dischargeDate = requiredError;
          } else if (!isValidDate(values.dischargeDate)) {
            errors.dischargeDate = invalidError;
          }
          if (!values.dischargeCriteria) {
            errors.dischargeCriteria = requiredError;
          }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <EntryTypeSelection
              entries={Object.values(Entries)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <Field
              label='Date'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <EntryExtraFields type={values.type} />

            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button
                  type='submit'
                  floated='right'
                  color='green'
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
