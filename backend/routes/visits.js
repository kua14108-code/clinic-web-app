const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');

/**
 * GET /api/visits
 * Get all visits
 */
router.get('/', async (req, res) => {
  try {
    const visits = await Visit.find().populate('patientId');
    res.json(visits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * POST /api/visits
 * Create new visit
 */
router.post('/', async (req, res) => {
  try {
    const { patientId, visitDate, diagnosis, notes } = req.body;

    const visit = new Visit({
      patientId,
      visitDate,
      diagnosis,
      notes,
    });

    const savedVisit = await visit.save();
    res.status(201).json(savedVisit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * PUT /api/visits/:id
 * Update visit
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedVisit = await Visit.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedVisit) {
      return res.status(404).json({ message: 'Visit not found' });
    }

    res.json(updatedVisit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * DELETE /api/visits/:id
 * Delete visit
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedVisit = await Visit.findByIdAndDelete(req.params.id);

    if (!deletedVisit) {
      return res.status(404).json({ message: 'Visit not found' });
    }

    res.json({ message: 'Visit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET /api/visits/stats/by-date
 * Aggregation: visits count by date
 */
router.get('/stats/by-date', async (req, res) => {
  try {
    const stats = await Visit.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$visitDate' },
          },
          totalVisits: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
