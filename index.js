// const http = require('http');

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json });
//   response.end(JSON.stringify(persons));
// });

const express = require('express');
const app = express();
app.use(express.json());

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

// Home page
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

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

// Delete person
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

// Create person
app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'Name is missing',
    });
  }

  const newPerson = {
    name: body.content,
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
