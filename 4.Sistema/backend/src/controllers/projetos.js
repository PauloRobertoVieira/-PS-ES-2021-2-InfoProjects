const express = require('express')
const app = express.Router()

const { query } = require("../db")

const Projeto = require('../models/entities/projeto')
const ProjetoRepositorio = require('../models/repositories/projeto')

const repositorio = new ProjetoRepositorio()

app.get('/', (req, res, next) => {
  repositorio.listar().then((projetos) => {
    console.log(projetos)
    res.json(projetos)
  }).catch((error) => {
    console.log("deu erro")
    next(error)
  })
})

app.get('/:id', (req, res, next) => {
  repositorio.ler(req.params.id).then(projeto => {
    if (!projeto) {
      res.status(404).json({ message: "Projeto not found" })
    } else {
      res.json(projeto)
    }

  }).catch((error) => {
    console.log("Erro em listar projetos")
    next(error)
  })
})

app.post('', (req, res, next) => {
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

app.put('/:id', (req, res, next) => {
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

app.delete('/:id', (req, res, next) => {

  repositorio.ler(req.params.id).then((projeto) => {
    if (!projeto) {
      res.status(404).json({ message: "Projeto not found" })
    } else {
      repositorio.deletar(projeto).then((isSuccess) => {
        if (isSuccess) {
          res.json({ message: "Projeto removido" })
        } else {
          res.status(400).json({ message: "Projeto não deletado" })
        }
      })
    }
  }).catch((error) => {
    console.log("Erro ao excluir")
    next(error)
  })
})

module.exports = app