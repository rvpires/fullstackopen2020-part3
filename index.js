require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')

//Exercise Morgan ouput 
morgan.token('content', function (req, res) {

    return JSON.stringify(req.body)
})

//Middleware functions
app.use(express.json())
app.use(morgan(':method :url :status :response-time :content'))
app.use(cors())
app.use(express.static('build'))


app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(person => {
        response.json(person.map(person => person.toJSON()))
    })
});

app.get('/info', (req, res, next) => {

    const date = new Date()

    Person.countDocuments({}).then(totalDocuments => res.send(`<div>
    <p>Phonebook has info for ${totalDocuments} people.</p>
    <p>${date}</p>
    <div/>`))

})



app.get('/api/persons/:id', (request, response, next) => {

    Person.findById(request.params.id)
        .then(person => response.json(person.toJSON()))
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {

    const id = (req.params.id)

    Person.findByIdAndRemove(id).then(result => res.status(204).end())
        .catch(error => next(error))
})


app.post('/api/persons', (request, response) => {

    const body = request.body
    const randomId = Math.round((Math.random() * 1000))

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Content missing'
        })
    }

    const newPerson = new Person({
        name: body.name,
        number: body.number,
        id: randomId,
    })

    newPerson.save().then(person => {
        response.json(person.toJSON())
    })
})


app.put('/api/persons/:id', (request, response, next) => {

    const body = request.body
    const id = request.params.id

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})



const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}


app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})