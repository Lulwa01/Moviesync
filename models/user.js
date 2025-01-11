const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  review: {
    type: String,
  },
  recommendation: {
    type: String,
    enum: ['recommended', 'not recommended']
  },
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  movies: [movieSchema],
});

module.exports = mongoose.model('User', userSchema);

