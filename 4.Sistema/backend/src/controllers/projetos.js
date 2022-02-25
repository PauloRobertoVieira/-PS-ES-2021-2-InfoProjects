const express = require('express')
const app = express.Router()

const { query } = require("../db")

app.get('/', (req, res) => {
  query("SELECT * FROM projeto ORDER BY name", (projetos) => {
    res.json(projetos)
  })
})

app.get('/:id', (req, res) => {
  query("SELECT * FROM projeto WHERE ?", (projetos) => {
    console.log(projetos)
    if (projetos.length < 1) {
      res.status(404).json({ message: "Projeto not found" })
    } else {
      res.json(projetos[0])
    }

  }, { id: req.params.id })

})

app.post('', (req, res) => {
  console.log(req)
  const post = req.body
  query("INSERT INTO projeto SET ?", (results) => {
    if (results.affectedRows < 1) {
      res.status(404).json({ message: "Projeto not found" })
    } else {
      res.json({ message: "Projeto Inserido" })
    }

  }, { name: post.name, budget: post.budget })
})

app.put('/:id', (req, res) => {
  console.log(req.params)
  const post = req.body
  res.send(`UpDate post ${req.params.id}`)
})

app.delete('/:id', (req, res) => {
  query("DELETE FROM projeto WHERE ?", (results) => {
    if (results.affectedRows < 1) {
      res.status(404).json({ message: "Projeto not found" })
    } else {
      res.json({ message: "Projeto removido" })
    }

  }, { id: req.params.id })
})

module.exports = app