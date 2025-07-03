const express = require('express');
const { body } = require('express-validator');
const { rateDoctor } = require('../controllers/doctorController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// POST /api/doctors/:id/rate
router.post(
    '/:id/rate',
    protect, [body('rating').isInt({ min: 1, max: 5 }), body('review').optional().isString().isLength({ max: 500 })],
    rateDoctor
);

module.exports = router;