const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: String,
  users: [
    {
      type: Object,
      ref: 'User'
    }
  ],
  uniqueDomain: [String],
  uniqueAvailability: [String]
});

module.exports = new mongoose.model('Team', teamSchema);;
