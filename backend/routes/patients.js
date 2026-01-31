const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

/**
 * GET /api/patients
 * Get all patients
 */
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * POST /api/patients
 * Create new patient
 */
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

/**
 * PUT /api/patients/:id
 * Update patient
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(updatedPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * DELETE /api/patients/:id
 * Delete patient
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET /api/patients/stats/gender
 * Aggregation: patients count by gender
 */
router.get('/stats/gender', async (req, res) => {
  try {
    const stats = await Patient.aggregate([
      {
        $group: {
          _id: '$gender',
          totalPatients: { $sum: 1 },
        },
      },
      {
        $sort: { totalPatients: -1 },
      },
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

