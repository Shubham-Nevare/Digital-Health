const express = require('express');
const { body } = require('express-validator');
const {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointmentStatus,
    cancelAppointment,
    rateAppointment,
    getDoctorSchedule,
    exportAppointments,
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const createAppointmentValidation = [
    body('doctorId').isMongoId().withMessage('Please provide a valid doctor ID'),
    body('date').isISO8601().withMessage('Please provide a valid appointment date'),
    body('time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Please provide a valid time (HH:MM)'),
    body('symptoms').trim().isLength({ min: 2 }).withMessage('Symptoms must be at least 2 characters long'),
    body('consultationType').isIn(["video", "audio", "chat", "in-person"]).withMessage('Invalid consultation type'),
];

const updateStatusValidation = [
    body('status').isIn(['pending', 'confirmed', 'completed', 'cancelled', 'no-show']).withMessage('Invalid status'),
    body('notes').optional().trim(),
    body('diagnosis').optional().trim(),
    body('prescription').optional().trim(),
    body('followUpDate').optional().isISO8601().withMessage('Please provide a valid follow-up date')
];

const rateAppointmentValidation = [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('review').optional().trim().isLength({ max: 500 }).withMessage('Review must be less than 500 characters')
];

// Public route for doctor schedule (no auth required)
router.get('/doctor/:doctorId/schedule', getDoctorSchedule);

// All routes require authentication
router.use(protect);

// Routes
router.post('/', createAppointmentValidation, createAppointment);
router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.put('/:id/status', authorize('doctor', 'admin'), updateStatusValidation, updateAppointmentStatus);
router.put('/:id/cancel', cancelAppointment);
router.post('/:id/rate', rateAppointmentValidation, rateAppointment);

// router.get('/export', authorize('admin'), exportAppointments);

module.exports = router;