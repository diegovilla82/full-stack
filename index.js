const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())

app.use(cors())

let notes = [
    {
        'id': 1,
        'content':'Me tengo que inscribir a @midudev en YouTube y Twitch',
        'date':'2019-04-11',
        'important':true
    },
    {
        'id': 2,
        'content':'Me tengo que inscribir a @midudev en YouTube y Twitch',
        'date':'2019-04-11',
        'important':true
    },
    {
        'id': 3,
        'content':'Me tengo que inscribir a @midudev en YouTube y Twitch',
        'date':'2019-04-11',
        'important':true
    }
]
// const app = http.createServer((request, response) => {
//     response.writeHead(200, {'content-type':'text/plain' })
//     response.end('Hello World.')
// })

// path and function flecha
app.get('/', (req, res) => {
    res.send('<h1>Hello World.</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    
    const id = req.params.id
    // console.log(id)  debo parcear el id a number, para poder aplicar la
    // condición, find nos encuentra el objeto buscado
    const note = notes.find(node => node.id === Number(id))
    //console.log(note.content)

    if (note) {
        return res.json(note)
    } else {
        // error 404 cuando no se encuentra el recurso
        return res.status('404').end()
    }

})

app.delete('/api/notes/:id', (res, req) => {
    const id = req.params.id
    notes = notes.filter(note => note.id ==! id)
    // error 204 cuando un recurso es borrado con exito
    res.status('204').end()

})

app.post('/api/notes', (req, res) => {
    const note = req.body

    if(!note || !note.content )
    {
        res.status('400').json({
            error: 'note.content is missing.'
        })
    }

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        date: new Date().toISOString(),
        important: typeof note.import !== 'undefined' ? note.important : true
    }

    // entre corchetes, otra forma de hacerlo es concat
    // notes = notes.concat(newNote) 
    notes = [...notes, newNote]

    return res.status(201).json(newNote)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
