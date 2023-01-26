require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;
console.log('connecting to', url);

mongoose
  .connect(url)
  .then((result) => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name must be minimum 3 characters long'],
    validate: {
      validator: function (v) {
        return /^[A-Za-z]+[A-Za-z\s]+[A-Za-z]+$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid name! Name should only contain letters (no white space at beginning and at the end).`,
    },
    required: [true, 'Name is required'],
  },
  number: {
    type: String,
    minLength: [8, 'Phone number must be at least 8 characters long'],
    validate: {
      validator: function (v) {
        return /^\d{2}\d?-\d{5,}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! The phone number must be in one of this format: xx-xxxxxx or xxx-xxxxx`,
    },
    required: [true, 'Phone number is required'],
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
