import express from 'express';
import { getPatients, addPatient } from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).send(getPatients());
});

router.post('/', (req, res) => {
  try {
    const addedPatient = addPatient(req.body);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
