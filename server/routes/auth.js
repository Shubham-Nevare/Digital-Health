const express = require('express');
const { body, validationResult } = require('express-validator');
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    updateMedicalHistory,
    uploadProfileImage,
    getDoctors,
    getDoctorById,
    addAdmin,
    getPatients,
    getAllUsers
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { check } = require('express-validator');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/avatars/');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function(req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Validation error handler
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation Error',
            errors: errors.array()
        });
    }
    next();
};

// Validation middleware
const registerValidation = [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone').matches(/^[\+]?[\d\s\-\(\)]{10,15}$/).withMessage('Please provide a valid phone number'),
    body('dateOfBirth').isISO8601().withMessage('Please provide a valid date of birth'),
    body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Please provide a valid gender'),
    body('address').trim().isLength({ min: 5 }).withMessage('Address must be at least 5 characters long'),
    body('role').optional().isIn(['patient', 'doctor']).withMessage('Role must be either patient or doctor')
];

const loginValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];

const updateProfileValidation = [
    body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    body('email').optional().isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('phone').optional().matches(/^[\+]?[\d\s\-\(\)]{10,15}$/).withMessage('Please provide a valid phone number'),
    body('address').optional().trim().isLength({ min: 5 }).withMessage('Address must be at least 5 characters long'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Routes
router.post('/register', registerValidation, handleValidationErrors, registerUser);
router.post('/login', loginValidation, handleValidationErrors, loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateProfileValidation, handleValidationErrors, updateUserProfile);
router.put('/profile/medical-history', protect, updateMedicalHistory);
router.post('/profile/image', protect, upload.single('profileImage'), uploadProfileImage);
router.get('/doctors', getDoctors);
router.get('/doctors/:id', getDoctorById);
router.get('/patients', getPatients);
router.get('/all-users', protect, getAllUsers);

// Admin route to add another admin
router.post('/add-admin', protect, (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Only admins can perform this action.' });
    }
    next();
}, [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], addAdmin);

module.exports = router;