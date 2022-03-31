const { query } = require("../../db")

const Servico = require("../entities/servico")

class ServicoRepositorio {

    ler(servicoid) {
        return query("SELECT * FROM servico WHERE ?", { id: servicoid }).then(servicos => {
            if (servicos.length < 1) {
                return null;
            } else {
                const row = servicos[0];
                return new Servico(row.id, row.name, row.cost, row.description)
            }
        })
    }

    listar() {
        return query("SELECT * FROM servico ORDER BY name").then((rows) => {
            const servicos = [];
            rows.forEach((row) => {
                const servico = new Servico(row.id, row.name, row.cost, row.description)
                servicos.push(servico)
            })
            return servicos
        });
    }

    criar(servico) {
        return query("INSERT INTO servico SET ?", { name: servico.name, cost: servico.cost, description: servico.description }).then(results => {
            if (results.insertId) {
                servico.id = results.insertId;
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

