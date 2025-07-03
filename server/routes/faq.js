const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');
// Optionally add authentication middleware here

router.get('/', faqController.getFAQs);
router.post('/', faqController.createFAQ);
router.put('/:id', faqController.updateFAQ);
router.delete('/:id', faqController.deleteFAQ);

module.exports = router;