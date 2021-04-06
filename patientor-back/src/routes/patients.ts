import express from 'express';
import {
  getPatients,
  addPatient,
  getPatientById,
  addEntryToPatient,
} from '../services/patientService';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    res.status(200).send(getPatients());
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/:id', (req, res) => {
  try {
    res.status(200).send(getPatientById(req.params.id));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patient = getPatientById(req.params.id);
    if (!patient) throw new Error('Patient not found');

    const newEntry = toNewEntry(req.body);
    const updatedPatient = addEntryToPatient(patient, newEntry);
    res.status(200).send(updatedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
