const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
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
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    recordType: {
        type: String,
        enum: ['consultation', 'lab_test', 'prescription', 'vaccination', 'surgery', 'emergency'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    symptoms: [String],
    diagnosis: String,
    treatment: String,
    prescription: {
        medications: [{
            name: String,
            dosage: String,
            frequency: String,
            duration: String,
            instructions: String
        }],
        notes: String
    },
    vitalSigns: {
        bloodPressure: String,
        heartRate: String,
        temperature: String,
        weight: String,
        height: String,
        oxygenSaturation: String
    },
    labResults: {
        testName: String,
        result: String,
        normalRange: String,
        unit: String,
        date: Date
    },
    attachments: [{
        fileName: String,
        fileUrl: String,
        fileType: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    isPrivate: {
        type: Boolean,
        default: false
    },
    tags: [String],
    followUpRequired: {
        type: Boolean,
        default: false
    },
    followUpDate: Date,
    followUpNotes: String
}, {
    timestamps: true
});

// Index for efficient queries
medicalRecordSchema.index({ patient: 1, createdAt: -1 });
medicalRecordSchema.index({ doctor: 1, createdAt: -1 });
medicalRecordSchema.index({ recordType: 1 });

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);