const { query } = require("../../db")

const Projeto = require("../entities/projeto")

class ProjetoRepositorio {

    ler(projetoid) {
        return query("SELECT * FROM projeto WHERE ?", { id: projetoid }).then(projetos => {
            if (projetos.length < 1) {
                return null;
            } else {
                const row = projetos[0];
                return new Projeto(row.id, row.name, row.budget)
            }
        })
    }

    listar() {
        return query("SELECT * FROM projeto ORDER BY name").then((rows) => {
            const projetos = [];
            rows.forEach((row) => {
                const projeto = new Projeto(row.id, row.name, row.budget)
                projetos.push(projeto)
            })
            return projetos
        });
    }

    criar(projeto) {
        return query("INSERT INTO projeto SET ?", { name: projeto.name, budget: projeto.budget }).then(results => {
            if (results.affectedRows < 1) {
                return false;
            } else {
                return true;
            }
        })
    }

    alterar(projeto) { }

    deletar(projeto) {
        return query("DELETE FROM projeto WHERE ?", { id: projeto.id }).then(results => {
            if (results.affectedRows < 1) {
                return false;
            } else {
                return true;
            }
        })
    }

}
module.exports = ProjetoRepositorio

