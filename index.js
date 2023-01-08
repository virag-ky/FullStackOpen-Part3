// const http = require('http');

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json });
//   response.end(JSON.stringify(persons));
// });

const express = require('express');
const app = express();

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
