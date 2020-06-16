const express = require('express');
const app = express();

app.use(express.json());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "TEST",
    number: "353-98765",
    id: 5,
  },
];

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/info', (request, response) => {
  const personsLength = persons.length;
  const date = new Date();
  const display = `
    <p>Phonebook has info for ${personsLength} people.</p>
    <p>${date}</p>
  `;

  response.send(display);
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const min = 1;
  const max = 100000;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    });
  }
  console.log(body.content)
  console.log(body.name)

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});