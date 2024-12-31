const express = require('express');
const router = express.Router();
const Company = require('../models/Company');



// Get all companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// Add a new company
router.post('/', async (req, res) => {
  try {
    // Validate communication periodicity
    if (req.body.communicationPeriodicity) {
      const { value, unit } = req.body.communicationPeriodicity;
      if (!value || !unit || value < 1 || !['days', 'weeks', 'months'].includes(unit)) {
        return res.status(400).json({ 
          error: 'Invalid communication periodicity. Must include value (>= 1) and unit (days/weeks/months)' 
        });
      }
    }

    const company = new Company(req.body);
    await company.save();
    res.status(201).json({ message: 'Company added successfully', company });
  } catch (error) {
    console.error('Error adding company:', error);
    res.status(500).json({ error: 'Failed to add company' });
  }
});

// Update a company
router.put('/:id', async (req, res) => {
  try {
    // Validate communication periodicity
    if (req.body.communicationPeriodicity) {
      const { value, unit } = req.body.communicationPeriodicity;
      if (!value || !unit || value < 1 || !['days', 'weeks', 'months'].includes(unit)) {
        return res.status(400).json({ 
          error: 'Invalid communication periodicity. Must include value (>= 1) and unit (days/weeks/months)' 
        });
      }
    }

    console.log('Update request body:', req.body);
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCompany) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.status(200).json({ message: 'Company updated successfully', updatedCompany });
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ error: 'Failed to update company' });
  }
});

// Delete a company
router.delete('/:id', async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete company' });
  }
});

router.post('/:id/communications', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, date, notes } = req.body;

    if (!type || !date || !notes) {
      return res.status(400).json({ error: 'All fields (type, date, notes) are required.' });
    }

    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found.' });
    }

    // Add communication
    if (!company.communications) {
      company.communications = [];
    }
    company.communications.push({ type, date: new Date(date), notes });

    // Ensure communicationPeriodicity exists with default values if not set
    if (!company.communicationPeriodicity) {
      company.communicationPeriodicity = {
        value: 1,
        unit: 'months'
      };
    }

    // Calculate next due date based on periodicity
    const communicationDate = new Date(date);
    const nextDueDate = new Date(communicationDate);
    
    const { value, unit } = company.communicationPeriodicity;
    
    switch (unit) {
      case 'days':
        nextDueDate.setDate(nextDueDate.getDate() + value);
        break;
      case 'weeks':
        nextDueDate.setDate(nextDueDate.getDate() + (value * 7));
        break;
      case 'months':
        nextDueDate.setMonth(nextDueDate.getMonth() + value);
        break;
      case 'years':
        nextDueDate.setFullYear(nextDueDate.getFullYear() + value);
        break;
      default:
        nextDueDate.setMonth(nextDueDate.getMonth() + 1); // Default to 1 month
    }

    // Save the updated company
    await company.save();

    res.status(201).json({ 
      message: 'Communication logged successfully', 
      nextCommunicationDue: nextDueDate,
      company 
    });
  } catch (error) {
    console.error('Error logging communication:', error);
    res.status(500).json({ 
      error: 'Failed to log communication.',
      details: error.message 
    });
  }
});


module.exports = router;