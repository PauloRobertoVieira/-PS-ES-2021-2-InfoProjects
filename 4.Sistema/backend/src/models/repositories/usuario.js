const { query } = require("../../db")

const Usuario = require("../entities/usuario")

class UsuarioRepositorio {

    ler(usuarioid) {
        return query("SELECT * FROM usuario WHERE ?", { id: usuarioid }).then(usuarios => {
            if (usuarios.length < 1) {
                return null;
            } else {
                const row = usuarios[0];
                return new Usuario(row.id, row.nome, row.email, row.senha, row.tipo)
            }
        })
    }

    listar() {
        return query("SELECT * FROM usuario ORDER BY nome").then((rows) => {
            const usuarios = [];
            rows.forEach((row) => {
                const usuario = new Usuario(row.id, row.nome, row.email, row.senha, row.tipo)
                usuarios.push(usuario)
            })
            return usuarios
        });
    }

    criar(usuario) {
        return query("INSERT INTO usuario SET ?", { nome: usuario.nome, email: usuario.email, senha: usuario.senha, tipo: usuario.tipo }).then(results => {
            if (results.insertId) {
                usuario.id = results.insertId;
                return usuario;
            }
        })
    }

    alterar(usuario) {
        return query("UPDATE usuario SET nome=?, email=?, senha=?, tipo=?  WHERE id =?", [usuario.nome, usuario.email, usuario.senha, usuario.tipo, usuario.id]).then(results => {
            if (results.affectedRows < 1) {
                return false;
            } else {
                return usuario;
            }
        })
    }

    deletar(usuario) {
        return query("DELETE FROM usuario WHERE ?", { id: usuario.id }).then(results => {
            if (results.affectedRows < 1) {
                return false;
            } else {
                return true;
            }
        })
    }

}
module.exports = UsuarioRepositorio