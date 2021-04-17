import React from 'react';
import { ErrorMessage, Field, FieldProps, FormikProps } from 'formik';
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react';
import { Diagnosis, Gender, Entries } from '../types';
import { assertNever } from '../utils';

// structure of a single option
export type GenderOption = {
  value: Gender;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: GenderOption[];
};

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as='select' name={name} className='ui dropdown'>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField = ({ field, label, min, max }: NumberProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />

    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const EntryTypeSelection = ({
  entries,
  setFieldValue,
  setFieldTouched,
}: {
  entries: Entries[];
  setFieldValue: FormikProps<{ type: Entries }>['setFieldValue'];
  setFieldTouched: FormikProps<{ type: Entries }>['setFieldTouched'];
}) => {
  const field = 'type';
  const onChange = (_event: React.SyntheticEvent, data: DropdownProps) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = entries.map((entry) => ({
    key: entry,
    text:
      entry === Entries.HealthCheck
        ? 'Health Check'
        : entry === Entries.OccupationalHealthcare
        ? 'Occupational Healthcare'
        : 'Hospital',
    value: entry,
  }));

  return (
    <Form.Field>
      <label>Entry Type</label>
      <Dropdown
        fluid
        selection
        options={stateOptions}
        onChange={onChange}
        defaultValue={Entries.HealthCheck}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>['setFieldValue'];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>['setFieldTouched'];
}) => {
  const field = 'diagnosisCodes';
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};

export const EntryExtraFields: React.FC<{ type: Entries }> = ({ type }) => {
  switch (type) {
    case Entries.HealthCheck:
      return (
        <Field
          label='Health Check Rating'
          name='healthCheckRating'
          component={NumberField}
          min={0}
          max={3}
        />
      );

    case Entries.OccupationalHealthcare:
      return (
        <>
          <Field
            label="Employer's Name"
            placeholder="Employer's Name"
            name='employerName'
            component={TextField}
          />
          <Field
            label='Sick leave start date'
            placeholder='YYYY-MM-DD'
            name='sickLeaveStart'
            component={TextField}
          />
          <Field
            label='Sick leave end date'
            placeholder='YYYY-MM-DD'
            name='sickLeaveEnd'
            component={TextField}
          />
        </>
      );

    case Entries.Hospital:
      return (
        <>
          <Field
            label='Discharge date'
            placeholder='YYYY-MM-DD'
            name='dischargeDate'
            component={TextField}
          />
          <Field
            label='Criteria for discharge'
            placeholder='Criteria'
            name='dischargeCriteria'
            component={TextField}
          />
        </>
      );

    default:
      return assertNever(type);
  }
};
