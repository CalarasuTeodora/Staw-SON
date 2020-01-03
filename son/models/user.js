const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  country: {
      type: String,
      required: true
  },
  age: {
      type: Number,
      requried: true
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