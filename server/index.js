const express = require('express');
//const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

// app.use(morgan(':method :url :status :json'));

// morgan.token('json', function (req, res) {
//   return JSON.stringify(req.body);
// });

let persons = [
  {
    id: 1,
    name: 'Michael Scott',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Jim Halpert',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dwight Schrute',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Pam Beesly',
    number: '39-23-6423122',
  },
];

// Generate ID
const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

// Get all persons
app.get('/api/persons', (request, response) => {
  response.json(persons);
});

// Display info
app.get('/info', (request, response) => {
  const info = `<p>Phonebook has info for ${persons.length} people.</p>
  <br/>
  <p>${new Date()}</p>
  `;

  response.send(info);
});

// Get person by id
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  person ? response.json(person) : response.status(404).end();
});

// app.put('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id);
//   const person = persons.find((person) => person.id === id);
//   const newPerson = {
//     ...person,
//     number: request.body.number,
//   };
//   persons[id - 1] = newPerson;
//   response.json(newPerson);
// });

// Delete person
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

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

  const newPerson = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: generateId(),
  };

  if (persons.includes(newPerson.content)) {
    return response.status(400).json({
      error: 'Name already exist',
    });
  }
  persons = persons.concat(newPerson);
  response.json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
