const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    require: true,
    trim: true,
  },
  members: [
    {
      type: Object,
      require: true,
      unique:true,
    }
  ],
});

module.exports = new mongoose.model("Team", teamSchema);
