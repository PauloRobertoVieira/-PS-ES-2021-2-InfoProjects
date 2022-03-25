const { query } = require("../../db")

const Servico = require("../entities/servico")

class ServicoRepositorio {

    ler(servicoid) {
        return query("SELECT * FROM servico WHERE ?", { id: servicoid }).then(servicos => {
            if (servicos.length < 1) {
                return null;
            } else {
                const row = servicos[0];
                return new Servico(row.id, row.nome, row.custo, row.descricao)
            }
        })
    }

    listar() {
        return query("SELECT * FROM servico ORDER BY nome").then((rows) => {
            const servicos = [];
            rows.forEach((row) => {
                const servico = new Servico(row.id, row.nome, row.custo, row.descricao)
                servicos.push(servico)
            })
            return servicos
        });
    }

    criar(servico) {
        return query("INSERT INTO servico SET ?", { nome: servico.nome, custo: servico.custo, descricao: servico.descricao }).then(results => {
            if (results.insertId) {
                servico.id = results.insertId;
                return servico;
            }
        })
    }

    alterar(servico) {
        return query("UPDATE servico SET nome=?, custo=?, descricao=?, WHERE id =?", [servico.nome, servico.custo, servico.descricao, servico.id]).then(results => {
            if (results.affectedRows < 1) {
                return false;
            } else {
                return servico;
            }
        })
    }

    deletar(servico) {
        return query("DELETE FROM servico WHERE ?", { id: servico.id }).then(results => {
            if (results.affectedRows < 1) {
                return false;
            } else {
                return true;
            }
        })
    }

}
module.exports = ServicoRepositorio

