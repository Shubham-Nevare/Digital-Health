const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { validationResult } = require('express-validator');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async(req, res) => {
    try {
        const { email, password, name, phone, dateOfBirth, gender, address, role, specialty, experience } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            email,
            password,
            name,
            phone,
            dateOfBirth,
            gender,
            address,
            role: role || 'patient',
            ...(role === 'doctor' && { specialty, experience })
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Hardcoded admin check
        if (email === 'admin@admin.com') {
            let adminUser = await User.findOne({ email: 'admin@admin.com' });

            if (!adminUser) {
                // If admin doesn't exist, create it.
                // This part should ideally be a setup script.
                adminUser = await User.create({
                    name: 'Admin User',
                    email: 'admin@admin.com',
                    password: 'admin123', // The 'save' hook will hash this
                    role: 'admin',
                    phone: '0000000000', // required field
                    dateOfBirth: new Date(), // required field
                    gender: 'Male', // required field
                    address: 'Admin Address' // required field
                });
            }

            // Now, compare the password
            const isMatch = await adminUser.comparePassword(password);
            if (isMatch) {
                return res.json({
                    _id: adminUser._id,
                    name: adminUser.name,
                    email: adminUser.email,
                    role: adminUser.role,
                    token: generateToken(adminUser._id)
                });
            }
        }

        // Find user by email for non-admins
        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            // Update last login
            user.lastLogin = new Date();
            await user.save();

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            user.address = req.body.address || user.address;
            user.profileImage = req.body.profileImage || user.profileImage;

            // Update patient-specific fields if user is a patient
            if (user.role === 'patient') {
                if (req.body.emergencyContacts) user.emergencyContacts = req.body.emergencyContacts;
                if (req.body.insuranceInfo) user.insuranceInfo = req.body.insuranceInfo;
                if (req.body.bloodType) user.bloodType = req.body.bloodType;
                if (req.body.height) user.height = req.body.height;
                if (req.body.weight) user.weight = req.body.weight;
                if (req.body.medicalHistory) user.medicalHistory = req.body.medicalHistory;
            }

            // Update doctor-specific fields if user is a doctor
            if (user.role === 'doctor') {
                if (req.body.specialty) user.specialty = req.body.specialty;
                if (req.body.experience) user.experience = req.body.experience;
                if (req.body.availability) user.availability = req.body.availability;
                if (req.body.consultationFee) user.consultationFee = req.body.consultationFee;
                if (req.body.languages) user.languages = req.body.languages;
                if (req.body.certifications) user.certifications = req.body.certifications;
                if (req.body.education) user.education = req.body.education;
                if (req.body.about) user.about = req.body.about;
            }

            // Update password if provided
            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                token: generateToken(updatedUser._id)
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update user medical history
// @route   PUT /api/auth/profile/medical-history
// @access  Private
const updateMedicalHistory = async(req, res) => {
    try {
        console.log('=== Medical History Update Request ===');
        console.log('User ID:', req.user._id);
        console.log('Request body:', req.body);

        // Check if user is authenticated
        if (!req.user || !req.user._id) {
            console.log('Authentication failed - no user or user ID');
            return res.status(401).json({ message: 'Authentication required' });
        }

        const user = await User.findById(req.user._id);
        console.log('Found user:', user ? user.name : 'Not found');

        if (!user) {
            console.log('User not found in database');
            return res.status(404).json({ message: 'User not found' });
        }

        // Only patients can update their medical history
        if (user.role !== 'patient') {
            console.log('User role is not patient:', user.role);
            return res.status(403).json({ message: 'Only patients can update medical history' });
        }

        const { medicalHistory } = req.body;
        console.log('Received medical history:', medicalHistory);

        if (!medicalHistory) {
            console.log('No medical history data provided');
            return res.status(400).json({ message: 'Medical history data is required' });
        }

        // Validate medical history structure
        if (!medicalHistory.allergies || !medicalHistory.chronicConditions || !medicalHistory.medications) {
            console.log('Invalid medical history structure:', medicalHistory);
            return res.status(400).json({ message: 'Invalid medical history structure' });
        }

        console.log('Current user medical history:', user.medicalHistory);

        // Update medical history
        user.medicalHistory = {
            allergies: medicalHistory.allergies || [],
            chronicConditions: medicalHistory.chronicConditions || [],
            medications: medicalHistory.medications || []
        };

        console.log('Updated medical history to save:', user.medicalHistory);

        const updatedUser = await user.save();
        console.log('User saved successfully. New medical history:', updatedUser.medicalHistory);

        const response = {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            medicalHistory: updatedUser.medicalHistory,
            token: generateToken(updatedUser._id)
        };

        console.log('Sending response:', response);
        res.json(response);
    } catch (error) {
        console.error('Error in updateMedicalHistory:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Upload profile image
// @route   POST /api/auth/profile/image
// @access  Private
const uploadProfileImage = async(req, res) => {
    try {
        console.log('=== Profile Image Upload Request ===');
        console.log('User ID:', req.user._id);

        if (!req.file) {
            console.log('No file uploaded');
            return res.status(400).json({ message: 'No image file uploaded' });
        }

        console.log('Uploaded file:', req.file);

        const user = await User.findById(req.user._id);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        // Create the image URL
        const imageUrl = `/uploads/avatars/${req.file.filename}`;
        console.log('Image URL:', imageUrl);

        // Update user's profile image
        user.profileImage = imageUrl;
        const updatedUser = await user.save();

        console.log('Profile image updated successfully');

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            profileImage: updatedUser.profileImage,
            token: generateToken(updatedUser._id)
        });
    } catch (error) {
        console.error('Error in uploadProfileImage:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all doctors
// @route   GET /api/auth/doctors
// @access  Public
const getDoctors = async(req, res) => {
    try {
        const { specialty, search, page = 1, limit = 100 } = req.query;

        const query = { role: { $regex: /^doctor$/i }, isActive: true };

        if (specialty) {
            query.specialty = { $regex: specialty, $options: 'i' };
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { specialty: { $regex: search, $options: 'i' } }
            ];
        }

        const doctors = await User.find(query)
            .select('-password')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ rating: -1, name: 1 });

        const total = await User.countDocuments(query);

        res.json({
            doctors,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error('Get doctors error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get doctor by ID
// @route   GET /api/auth/doctors/:id
// @access  Public
const getDoctorById = async(req, res) => {
    try {
        const doctor = await User.findOne({
            _id: req.params.id,
            role: 'doctor',
            isActive: true
        }).select('-password');

        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        console.error('Get doctor error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all patients
// @route   GET /api/auth/patients
// @access  Private/Admin
const getPatients = async(req, res) => {
    try {
        const { search, page = 1, limit = 100 } = req.query;

        const query = { role: { $regex: /^patient$/i } };

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const patients = await User.find(query)
            .select('-password')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await User.countDocuments(query);

        res.json({
            patients,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error('Get patients error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    DEBUG: Get all users
// @route   GET /api/auth/all-users
// @access  Private/Admin
const getAllUsers = async(req, res) => {
    console.log('--- DEBUG: Fetching all users ---');
    try {
        const users = await User.find({}).select('-password');
        console.log(`DEBUG: Found ${users.length} total users.`);
        // Log a summary to the server console
        console.log('DEBUG: All user roles:', users.map(u => ({ name: u.name, role: u.role })));
        res.json(users);
    } catch (error) {
        console.error('DEBUG: Get all users error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Add a new admin user
// @route   POST /api/auth/add-admin
// @access  Private/Admin
const addAdmin = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            role: 'admin',
            phone: '0000000000', // Placeholder
            dateOfBirth: new Date(), // Placeholder
            gender: 'Other', // Placeholder
            address: 'Admin Address' // placeholder
        });

        await user.save();

        res.json({ msg: 'Admin user created successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    updateMedicalHistory,
    uploadProfileImage,
    getDoctors,
    getDoctorById,
    getPatients,
    addAdmin,
    getAllUsers
};