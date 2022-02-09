const express = require('express')
const app = express.Router()

app.get('/', (req, res) => {
    const projetos = [
      {
        id: 1,
        name: 'Projeto1'
      },
      {
        id: 2,
        name: 'Projeto2'
      }
    ]
      res.json(projetos)
  })
  
  app.get('/:id', (req, res) => {
    console.log(req.params)
     res.send(`Return post ${req.params.id}`)
  })
  
  app.delete('/:id', (req, res) => {
    console.log(req.params)
     res.send(`Delete post ${req.params.id}`)
  })
  
  app.put('/:id', (req, res) => {
    console.log(req.params)
    const post = req.body
     res.send(`UpDate post ${req.params.id}`)
  })
  
  app.post('', (req, res) => {
    console.log(req.body)
    const post = req.body
    res.send(`Save post ${post.id}`)
  })

  module.exports = app