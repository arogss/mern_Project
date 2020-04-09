const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

const Client = mongoose.model('client', ClientSchema);

module.exports = Client;