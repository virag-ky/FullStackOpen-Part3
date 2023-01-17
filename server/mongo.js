const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const phoneNumber = process.argv[4];

const url = `mongodb+srv://Virag:${password}@cluster0.gytd5uh.mongodb.net/?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
});

const Person = mongoose.model('Person', personSchema);

mongoose
  .connect(url)
  .then(() => {
    console.log('connected');

    if (process.argv.length === 3) {
      Person.find({}).then((result) => {
        result.forEach((person) => {
          console.log(person);
        });
        mongoose.connection.close();
      });
    } else if (process.argv.length > 3) {
      const person = new Person({
        name: name,
        number: phoneNumber,
        date: new Date(),
      });

      person.save().then(() => {
        console.log(`Added ${name} number ${phoneNumber} to phonebook`);
        return mongoose.connection.close();
      });
    }
  })
  .catch((err) => console.log(err));
