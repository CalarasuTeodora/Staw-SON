const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  password: {
    type: String,
  },
  country: {
      type: String,
  },
  age: {
      type: Number,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Friend'
    }
  ],
  accounts: {
    type: Map,
    of: String
  },
  hobbies: [
      {
          type: String
      }
  ]
});

module.exports = mongoose.model('User', userSchema);