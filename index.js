require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

//Exercise Morgan ouput 
morgan.token('content', function (req) {

	return JSON.stringify(req.body)
})

//Middleware functions
app.use(express.json())
app.use(morgan(':method :url :status :response-time :content'))
app.use(cors())
app.use(express.static('build'))


app.get('/api/persons', (request, response, next) => {
	Person.find({})
		.then(person => {
			response.json(person.map(person => person.toJSON()))
		})
		.catch(error => next(error))
})

app.get('/info', (req, res, next) => {

	const date = new Date()

	Person.countDocuments({}).then(totalDocuments => res.send(`<div>
    <p>Phonebook has info for ${totalDocuments} people.</p>
    <p>${date}</p>
    <div/>`)).catch(error => next(error))


})



app.get('/api/persons/:id', (request, response, next) => {

	Person.findById(request.params.id)
		.then(person => response.json(person.toJSON()))
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {

	const id = (req.params.id)

	Person.findByIdAndRemove(id).then(() => res.status(204).end())
		.catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {

	const body = request.body
	//const randomId = Math.round((Math.random() * 1000))    

	const newPerson = new Person({
		name: body.name,
		number: body.number
	})

	newPerson.save().then(person => {
		response.json(person.toJSON())
	})
		.catch(error => next(error))
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

	else if(error.name === 'ValidationError')
	{
		return response.status(400).send({ error: error.message })
	}

	next(error)
}


app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})