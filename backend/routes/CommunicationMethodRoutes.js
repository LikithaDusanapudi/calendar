const express = require('express');
const router = express.Router();
const CommunicationMethod = require('../models/CommunicationMethod');

// Get all communication methods, sorted by sequence
router.get('/', async (req, res) => {
  try {
    const methods = await CommunicationMethod.find().sort('sequence');
    res.status(200).json(methods);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch communication methods' });
  }
});

// Add a new communication method
router.post('/', async (req, res) => {
  try {
    const { name, description, sequence, mandatory } = req.body;

    // Input validation
    if (!name || !description || sequence === undefined) {
      return res.status(400).json({ error: 'Name, description, and sequence are required' });
    }

    const method = new CommunicationMethod({ name, description, sequence, mandatory });
    await method.save();

    res.status(201).json({ message: 'Communication method added successfully', method });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add communication method' });
  }
});

// Update a communication method
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMethod = await CommunicationMethod.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedMethod) {
      return res.status(404).json({ error: 'Communication method not found' });
    }

    res.status(200).json({ message: 'Communication method updated successfully', updatedMethod });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update communication method' });
  }
});

// Delete a communication method
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMethod = await CommunicationMethod.findByIdAndDelete(id);

    if (!deletedMethod) {
      return res.status(404).json({ error: 'Communication method not found' });
    }

    res.status(200).json({ message: 'Communication method deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete communication method' });
  }
});

// Reorder communication methods (drag-and-drop feature)
router.post('/reorder', async (req, res) => {
  try {
    const { methods } = req.body;

    if (!Array.isArray(methods)) {
      return res.status(400).json({ error: 'Methods should be an array' });
    }

    const bulkOps = methods.map((method, index) => ({
      updateOne: {
        filter: { _id: method._id },
        update: { sequence: index + 1 }
      }
    }));

    await CommunicationMethod.bulkWrite(bulkOps);

    res.status(200).json({ message: 'Communication methods reordered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder communication methods' });
  }
});

module.exports = router;
