require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Person = require('./models/person');

const app = express();
app.use(express.static('build'));
app.use(cors());
app.use(express.json());

// Get all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// Get person by id
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      person ? response.json(person) : response.status(404).end();
    })
    .catch((error) => next(error));
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

  const newPerson = new Person({
    name: body.name,
    number: body.number,
    date: new Date(),
  });

  newPerson.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted ID' });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
