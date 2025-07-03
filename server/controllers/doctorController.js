const User = require('../models/User');

// POST /api/doctors/:id/rate
exports.rateDoctor = async(req, res) => {
    try {
        const doctorId = req.params.id;
        const { rating, review } = req.body;
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }
        const doctor = await User.findById(doctorId);
        if (!doctor || doctor.role !== 'doctor') {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        // Prevent duplicate ratings from the same user
        if (doctor.ratings && doctor.ratings.some(r => r.user.toString() === req.user._id.toString())) {
            return res.status(400).json({ message: 'You have already rated this doctor.' });
        }
        // Add detailed rating
        doctor.ratings = doctor.ratings || [];
        doctor.ratings.push({
            user: req.user._id,
            rating,
            review,
            date: new Date()
        });
        // Update reviews count and average rating
        doctor.reviews = (doctor.reviews || 0) + 1;
        doctor.rating = ((doctor.rating || 0) * (doctor.reviews - 1) + rating) / doctor.reviews;
        await doctor.save();
        res.json({ message: 'Doctor rated successfully', doctor });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};