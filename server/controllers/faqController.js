const FAQ = require('../models/FAQ');

// Get all FAQs
exports.getFAQs = async(req, res) => {
    try {
        const faqs = await FAQ.find().sort({ createdAt: -1 });
        const total = await FAQ.countDocuments();
        res.json({ faqs, total });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create FAQ
exports.createFAQ = async(req, res) => {
    try {
        const { question, answer } = req.body;
        if (!question || !answer) {
            return res.status(400).json({ message: 'Question and answer are required' });
        }
        const faq = new FAQ({ question, answer });
        await faq.save();
        res.status(201).json(faq);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update FAQ
exports.updateFAQ = async(req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;
        const faq = await FAQ.findByIdAndUpdate(id, { question, answer }, { new: true });
        if (!faq) return res.status(404).json({ message: 'FAQ not found' });
        res.json(faq);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete FAQ
exports.deleteFAQ = async(req, res) => {
    try {
        const { id } = req.params;
        const faq = await FAQ.findByIdAndDelete(id);
        if (!faq) return res.status(404).json({ message: 'FAQ not found' });
        res.json({ message: 'FAQ deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};