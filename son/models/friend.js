const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const friendSchema = new Schema({
  email: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  country: {
      type: String,
  },
  age: {
      type: Number,
  },
  network: {
      type: String,
      required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

});

module.exports = mongoose.model('Friend', friendSchema);