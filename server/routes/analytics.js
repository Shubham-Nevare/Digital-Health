const express = require('express');
const router = express.Router();
const { getAnalyticsSummary } = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/analytics/summary
// @desc    Get analytics summary data
// @access  Private (Admin only)
router.get('/summary', protect, authorize('admin'), getAnalyticsSummary);

module.exports = router;