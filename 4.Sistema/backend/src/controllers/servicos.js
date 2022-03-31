const express = require('express')
const app = express.Router()

const { query } = require("../db")

const Servico = require('../models/entities/servico')
const ServicoRepositorio = require('../models/repositories/servico')

const repositorio = new ServicoRepositorio()

app.get('/', (req, res, next) => {
  repositorio.listar().then((servicos) => {
    res.json(servicos)
  }).catch((error) => {
    console.log("deu erro")
    next(error)
  })
})

app.get('/:id', (req, res, next) => {
  repositorio.ler(req.params.id).then(servico => {
    if (!servico) {
      res.status(404).json({ message: "Servico not found" })
    } else {
      res.json(servico)
    }
  }).catch((error) => {
    console.log("Erro em listar servicos")
    next(error)
  })
})

app.post('', (req, res, next) => {
  const post = req.body
  const servico = new Servico(null, post.name, post.cost, post.description)
  if (servico.validar()) {
    repositorio.criar(servico).then(newService => {
      res.status(201).json(newService)
    }).catch((error) => {
      console.log("Erro ao criar servico")
      next(error)
    })
  } else {
    res.status(400).json({
      validation: servico.validation
    })
  }
})

app.delete('/:id', (req, res, next) => {
  repositorio.ler(req.params.id).then((servico) => {
    if (!servico) {
      res.status(404).json({ message: "Servico not found" })
    } else {
      repositorio.deletar(servico).then((isSuccess) => {
        if (isSuccess) {
          res.json({ message: "Servico removido" })
        } else {
          res.status(400).json({ message: "Servico não deletado" })
        }
      })
    }
  }).catch((error) => {
    console.log("Erro ao excluir")
    next(error)
  })
})

module.exports = app