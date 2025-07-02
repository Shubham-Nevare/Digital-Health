const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        default: 30, // minutes
        required: true
    },
    consultationType: {
        type: String,
        enum: ['video', 'audio', 'chat', 'in-person'],
        default: 'video'
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no-show', 'rejected'],
        default: 'pending'
    },
    consultationFee: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'debit_card', 'upi', 'net_banking', 'wallet'],
        required: function() { return this.paymentStatus === 'paid'; }
    },
    symptoms: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String,
        default: null
    },
    prescription: {
        type: String,
        default: null
    },
    notes: {
        type: String,
        default: null
    },
    followUpDate: {
        type: Date,
        default: null
    },
    meetingLink: {
        type: String,
        default: null
    },
    meetingId: {
        type: String,
        default: null
    },
    isEmergency: {
        type: Boolean,
        default: false
    },
    cancellationReason: {
        type: String,
        default: null
    },
    cancelledBy: {
        type: String,
        enum: ['patient', 'doctor', 'admin'],
        default: null
    },
    rejectionReason: {
        type: String,
        default: null
    },
    rejectedBy: {
        type: String,
        enum: ['doctor', 'admin'],
        default: null
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null
    },
    review: {
        type: String,
        default: null
    },
    reviewDate: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

// Index for efficient queries
appointmentSchema.index({ patient: 1, appointmentDate: 1 });
appointmentSchema.index({ doctor: 1, appointmentDate: 1 });
appointmentSchema.index({ status: 1, appointmentDate: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);