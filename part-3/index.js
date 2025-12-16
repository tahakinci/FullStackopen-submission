const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require('dotenv').config();
const app = express()

const Person = require("./models/person")


morgan.token("body", (req, res) => JSON.stringify(req.body))


app.use(cors())
app.use(express.json())
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req, res)
    ].join(' ')
}))

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message })
    }

    next(error)
}


app.get("/info", (req, res) => {
    const personLength = Person.find({}).then(persons => persons.length)
    res.send(`<div>
        <p>Phonebook has info for ${personLength} people</p>
        <p>${new Date()}</p>
    </div>`)
})

app.get("/api/persons", (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get("/api/persons/:id", (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
})

app.delete("/api/persons/:id", (req, res) => {
    Person.findByIdAndDelete(req.params.id).then(person => {
        if (person)
            res.status(204).end()
    })
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
        .catch(error => next(error))

})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)