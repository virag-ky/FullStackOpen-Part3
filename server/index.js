require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Person = require('./models/person');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

// Get all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// Get person by id
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  Person.findById(id).then((person) => {
    person ? response.json(person) : response.status(404).end();
  });
});

// // Delete person
// app.delete('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id);
//   persons = persons.filter((person) => person.id !== id);
//   response.status(204).end();
// });

// Create person
app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'Name is missing',
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: 'Number is missing',
    });
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
    date: new Date(),
  });

  // if (persons.includes(newPerson.content)) {
  //   return response.status(400).json({
  //     error: 'Name already exist',
  //   });
  // }
  newPerson.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
