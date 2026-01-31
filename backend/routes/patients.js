const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// GET /api/patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// POST /api/patients
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, gender } = req.body;

    const patient = new Patient({
      firstName,
      lastName,
      dateOfBirth,
      gender,
    });

    const savedPatient = await patient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
