import diagnosesData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

export const getDiagnoses = (): Diagnose[] => {
  return diagnosesData;
};

export default {
  getDiagnoses,
};
