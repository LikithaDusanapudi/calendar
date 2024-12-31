// models/Company.js
const mongoose = require('mongoose');

const CommunicationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  date: { type: Date, required: true },
  notes: { type: String, required: true }
});

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  linkedInProfile: { type: String },
  emails: { type: [String], required: true },
  phoneNumbers: { type: String },
  comments: { type: String },
  communicationPeriodicity: {
    value: { type: Number, required: true },
    unit: { type: String, enum: ['days', 'weeks', 'months'], required: true },
  },  
  communications: [CommunicationSchema] // New field for communication logs
});

module.exports = mongoose.model('Company', CompanySchema);
