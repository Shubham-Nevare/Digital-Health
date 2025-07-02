const Appointment = require('../models/Appointment');
const User = require('../models/User');

// @desc    Get analytics summary
// @route   GET /api/analytics/summary
// @access  Private (Admin)
const getAnalyticsSummary = async(req, res) => {
    try {
        const totalAppointments = await Appointment.countDocuments();
        const totalDoctors = await User.countDocuments({ role: 'doctor' });
        const totalPatients = await User.countDocuments({ role: 'patient' });

        // Calculate total revenue from completed appointments with a valid fee
        const revenueResult = await Appointment.aggregate([
            { $match: { status: 'completed', consultationFee: { $exists: true, $ne: null } } },
            { $group: { _id: null, totalRevenue: { $sum: '$consultationFee' } } }
        ]);
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

        // Get appointment status breakdown
        const appointmentStatus = await Appointment.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        // Get appointment trends for the last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const appointmentTrends = await Appointment.aggregate([
            { $match: { createdAt: { $gte: thirtyDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({
            totalAppointments,
            totalDoctors,
            totalPatients,
            totalRevenue,
            appointmentStatus,
            appointmentTrends
        });

    } catch (error) {
        console.error('Analytics Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getAnalyticsSummary
};