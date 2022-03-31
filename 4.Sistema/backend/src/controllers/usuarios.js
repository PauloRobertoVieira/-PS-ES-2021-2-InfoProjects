const express = require('express')
const app = express.Router()

const { query } = require("../db")

const Usuario = require('../models/entities/usuario')
const UsuarioRepositorio = require('../models/repositories/usuario')

const repositorio = new UsuarioRepositorio()

app.get('/', (req, res, next) => {
    repositorio.listar().then((usuarios) => {
        res.json(usuarios)
    }).catch((error) => {
        console.log("deu erro")
        next(error)
    })
})

app.get('/:id', (req, res, next) => {
    repositorio.ler(req.params.id).then(usuario => {
        if (!usuario) {
            res.status(404).json({ message: "User not found" })
        } else {
            res.json(usuario)
        }
    }).catch((error) => {
        console.log("Erro em listar usuarios")
        next(error)
    })
})

app.post('', (req, res, next) => {
    const post = req.body
    const usuario = new Usuario(null, post.nome, post.email, post.senha, post.tipo)
    if (usuario.validar()) {
        repositorio.criar(usuario).then(newUsuario => {
            res.status(201).json(newUsuario)
        }).catch((error) => {
            console.log("Erro ao criar usuario")
            next(error)
        })
    } else {
        res.status(400).json({
            validation: usuario.validation
        })
    }
})

app.put('/:id', (req, res, next) => {
    const put = req.body
    const usuario = new Usuario(req.params.id, put.nome, put.email, put.senha, put.tipo)
    repositorio.alterar(usuario).then((updateUsuario) => {
        res.json(updateUsuario);
    }).catch((error) => {
        console.log("Erro ao alterar usuario")
        next(error)
    })
})

app.delete('/:id', (req, res, next) => {
    repositorio.ler(req.params.id).then((usuario) => {
        if (!usuario) {
            res.status(404).json({ message: "User not found" })
        } else {
            repositorio.deletar(usuario).then((isSuccess) => {
                if (isSuccess) {
                    res.json({ message: "Usuario removido" })
                } else {
                    res.status(400).json({ message: "Usuario não deletado" })
                }
            })
        }
    }).catch((error) => {
        console.log("Erro ao excluir")
        next(error)
    })
})

module.exports = app