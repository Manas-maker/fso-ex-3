require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const person = require('./models/person')
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('body', (request, response) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    id = Number(request.params.id)
    person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/api/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people<br/>${Date()}</p>`).end()
})

app.delete('/api/persons/:id', (request, response) => {
    id = Number(request.params.id)
    person = persons.find(p => p.id === id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 10000)
}

app.post('/api/persons', (request, response) => {
    body = request.body
    console.log(body)
    if (!body.name || !body.number) {
        return response.status(400).json({
            "error": "content missing"
        })
    }

    const person = new Person ({
        "name": body.name,
        "number": body.number
    })
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port${PORT}`)
})