const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { doctorId, date, time, symptoms, consultationType } = req.body;
        const patientId = req.user._id;

        const doctor = await User.findOne({ _id: doctorId, role: 'doctor' });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        const patient = await User.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const conflictingAppointment = await Appointment.findOne({
            doctor: doctorId,
            appointmentDate: new Date(date),
            appointmentTime: time,
            status: { $in: ['pending', 'confirmed'] }
        });

        if (conflictingAppointment) {
            return res.status(400).json({ message: 'This time slot is already booked' });
        }

        const appointment = await Appointment.create({
            patient: patientId,
            doctor: doctorId,
            appointmentDate: date,
            appointmentTime: time,
            symptoms: symptoms,
            consultationType: consultationType,
            consultationFee: doctor.consultationFee,
        });

        const populatedAppointment = await Appointment.findById(appointment._id)
            .populate('patient', 'name email phone')
            .populate('doctor', 'name specialty consultationFee');

        res.status(201).json({
            message: 'Appointment created successfully',
            appointment: populatedAppointment,
        });
    } catch (error) {
        console.error('Create appointment error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all appointments for a user
// @route   GET /api/appointments
// @access  Private
const getAppointments = async(req, res) => {
    try {
        const { status, page = 1, limit = 100 } = req.query;

        const query = {};

        // Filter by user role
        if (req.user.role === 'doctor') {
            query.doctor = req.user._id;
        } else if (req.user.role === 'patient') {
            query.patient = req.user._id;
        }
        // If admin, do not filter by user

        if (status) {
            // Allow filtering by multiple statuses, comma-separated
            query.status = { $in: status.split(",") };
        }

        const appointments = await Appointment.find(query)
            .populate('patient', 'name email phone')
            .populate('doctor', 'name specialty consultationFee profileImage')
            .sort({ appointmentDate: -1, appointmentTime: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Appointment.countDocuments(query);

        res.json({
            appointments,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error('Get appointments error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = async(req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('patient', 'name email phone')
            .populate('doctor', 'name specialty consultationFee');

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Check if user has access to this appointment
        if (req.user.role !== 'admin' &&
            appointment.patient._id.toString() !== req.user._id.toString() &&
            appointment.doctor._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        res.json(appointment);
    } catch (error) {
        console.error('Get appointment error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private
const updateAppointmentStatus = async(req, res) => {
    try {
        const { status, notes, diagnosis, prescription, followUpDate, rejectionReason } = req.body;

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Check if user has permission to update this appointment
        if (req.user.role !== 'admin' &&
            appointment.doctor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        appointment.status = status || appointment.status;

        if (notes) appointment.notes = notes;
        if (diagnosis) appointment.diagnosis = diagnosis;
        if (prescription) appointment.prescription = prescription;
        if (followUpDate) appointment.followUpDate = followUpDate;

        if (status === 'rejected') {
            appointment.rejectionReason = rejectionReason || 'No reason provided';
            appointment.rejectedBy = req.user.role;
        }

        // If appointment is completed, update doctor's rating
        if (status === 'completed' && appointment.rating) {
            const doctor = await User.findById(appointment.doctor);
            if (doctor) {
                const totalRating = doctor.rating * doctor.reviews + appointment.rating;
                doctor.reviews += 1;
                doctor.rating = totalRating / doctor.reviews;
                await doctor.save();
            }
        }

        const updatedAppointment = await appointment.save();

        const populatedAppointment = await Appointment.findById(updatedAppointment._id)
            .populate('patient', 'name email phone')
            .populate('doctor', 'name specialty consultationFee');

        res.json(populatedAppointment);
    } catch (error) {
        console.error('Update appointment error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Cancel appointment
// @route   PUT /api/appointments/:id/cancel
// @access  Private
const cancelAppointment = async(req, res) => {
    try {
        const { cancellationReason } = req.body;

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Check if user has permission to cancel this appointment
        if (req.user.role !== 'admin' &&
            appointment.patient.toString() !== req.user._id.toString() &&
            appointment.doctor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Check if appointment can be cancelled
        if (appointment.status === 'completed' || appointment.status === 'cancelled') {
            return res.status(400).json({ message: 'Appointment cannot be cancelled' });
        }

        appointment.status = 'cancelled';
        appointment.cancellationReason = cancellationReason || 'Cancelled by user';
        appointment.cancelledBy = req.user.role;

        await appointment.save();

        const populatedAppointment = await Appointment.findById(appointment._id)
            .populate('patient', 'name email phone')
            .populate('doctor', 'name specialty consultationFee profileImage');

        res.json({
            message: 'Appointment cancelled successfully',
            appointment: populatedAppointment,
        });
    } catch (error) {
        console.error('Cancel appointment error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Rate appointment
// @route   POST /api/appointments/:id/rate
// @access  Private
const rateAppointment = async(req, res) => {
    try {
        const { rating, review } = req.body;

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Check if user is the patient of this appointment
        if (appointment.patient.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Check if appointment is completed
        if (appointment.status !== 'completed') {
            return res.status(400).json({ message: 'Can only rate completed appointments' });
        }

        // Check if already rated
        if (appointment.rating) {
            return res.status(400).json({ message: 'Appointment already rated' });
        }

        appointment.rating = rating;
        appointment.review = review;
        appointment.reviewDate = new Date();

        const updatedAppointment = await appointment.save();

        // Update doctor's overall rating
        const doctor = await User.findById(appointment.doctor);
        if (doctor) {
            const totalRating = doctor.rating * doctor.reviews + rating;
            doctor.reviews += 1;
            doctor.rating = totalRating / doctor.reviews;
            await doctor.save();
        }

        res.json(updatedAppointment);
    } catch (error) {
        console.error('Rate appointment error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get doctor's schedule
// @route   GET /api/appointments/doctor/:doctorId/schedule
// @access  Public
const getDoctorSchedule = async(req, res) => {
    try {
        const { date } = req.query;
        const { doctorId } = req.params;

        const query = {
            doctor: doctorId,
            status: { $in: ['pending', 'confirmed'] }
        };

        if (date) {
            query.appointmentDate = new Date(date);
        }

        const appointments = await Appointment.find(query)
            .select('appointmentDate appointmentTime duration status')
            .sort({ appointmentDate: 1, appointmentTime: 1 });

        res.json(appointments);
    } catch (error) {
        console.error('Get doctor schedule error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointmentStatus,
    cancelAppointment,
    rateAppointment,
    getDoctorSchedule
};