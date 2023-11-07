const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: Number, require: true,trim: true  },
  first_name:{type:String,require:true,trim: true },
  last_name:{type:String,require:true,trim: true },
  email:{type:String,require:true,trim: true },
  gender:{type:String,require:true,trim: true },
  avatar:{type:String,trim: true },
  domain:{type:String,require:true,trim: true },
  available:{type:Boolean,require:true},
});

module.exports = new mongoose.model("user",userSchema)