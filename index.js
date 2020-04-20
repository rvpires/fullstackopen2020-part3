const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')


app.use(express.json())

morgan.token('content', function (req, res) { 

    return JSON.stringify(req.body)})

app.use(morgan(':method :url :status :response-time :content'))
app.use(cors())
app.use(express.static('build'))




let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})


app.get('/info', (req, res) => {    


    const date = new Date()
    const totalPeople = persons.length
    res.send(`<div>
                <p>Phonebook has info for ${totalPeople} people.</p>
                <p>${date}</p>
              <div/>`)}
        )

app.get('/api/persons/:id', (req, res) => {

    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if(person)
    {
        res.json(person)
    }

    else
    {
        res.status(404).end()
    }

})


app.delete('/api/persons/:id', (req, res) => {

    const id = Number(req.params.id)

    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})


app.post('/api/persons', (request, response) => {
    
    const body = request.body
    const randomId = Math.round((Math.random()*1000))
    
    if(!body.name || !body.number)
    {
        return response.status(400).json({ 
            error: 'Content missing' 
          })
    }    



    else if((persons.find(person => person.name === body.name)) !== undefined)
    {
        return response.status(400).json({ 
            error: 'Person already on phonebook.' 
          })
    }


    const newPerson = {
        name: body.name,
        number: body.number,
        id: randomId,
      }

    persons = persons.concat(newPerson)  
    response.json(newPerson)
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})