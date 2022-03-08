const express = require('express')
const app = express.Router()

const { query } = require("../db")

const Projeto = require('../models/projeto')

app.get('/', (req, res, next) => {
  query("SELECT * FROM projetos ORDER BY name").then((projetos) => {
    res.json(projetos)
  }).catch((error) => {
    console.log("deu erro")
    next(error)
  })
})

app.get('/:id', (req, res) => {
  query("SELECT * FROM projeto WHERE ?", { id: req.params.id }).then(projetos => {
    if (projetos.length < 1) {
      res.status(404).json({ message: "Projeto not found" })
    } else {
      res.json(projetos[0])
    }

  }).catch((error) => {
    console.log("Erro em listar projetos")
    next(error)
  })
})

app.post('', (req, res) => {
  const post = req.body

  const projeto = new Projeto(null, post.name, post.budget)

  if (projeto.validar()) {
    query("INSERT INTO projeto SET ?", { name: post.name, budget: post.budget }).then(results => {
      if (results.affectedRows < 1) {
        res.status(404).json({ message: "Projeto not found" })
      } else {
        res.json({ message: "Projeto Inserido" })
      }
    }).catch((error) => {
      console.log("Erro ao criar projeto")
      next(error)
    })
  } else {
    res.status(400).json({
      validation: projeto.validation
    })
  }
})

app.put('/:id', (req, res) => {
  const put = req.body
  query("UPDATE projeto SET name=?, budget=?  WHERE id =?", [put.name, put.budget, req.params.id]).then(results => {
    if (results.affectedRows < 1) {
      res.status(404).json({ message: "Projeto not found" })
    } else {
      res.json({ message: "Projeto Alterado" })
    }
  }).catch((error) => {
    console.log("Erro ao alterar projeto")
    next(error)
  })
})

app.delete('/:id', (req, res) => {
  const response = query("DELETE FROM projeto WHERE ?", { id: req.params.id })

  response.then(results => {
    if (results.affectedRows < 1) {
      res.status(404).json({ message: "Projeto not found" })
    } else {
      res.json({ message: "Projeto removido" })
    }
  }).catch((error) => {
    console.log("Erro ao excluir")
    next(error)
  })
})

module.exports = app