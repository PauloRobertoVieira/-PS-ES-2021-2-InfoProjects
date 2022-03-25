const EntityBase = require('./base');

class Servico extends EntityBase {

    constructor(id, nome, custo, descricao) {
        super();
        this.id = id;
        this.nome = nome;
        this.custo = custo;
        this.descricao = descricao;
    }

    validar() {
        let isvalid = true
        if (!this.nome) {
            this.validation.push("Servico precisa ter nome")
            isvalid = false
        } else if (this.nome.length < 4) {
            this.validation.push("Nome precisa mais de 4 caracteres")
            isvalid = false
        }

        if (!this.custo) {
            this.validation.push("Servico precisa ter valor")
            isvalid = false
        }

        if (!this.descricao) {
            this.validation.push("Servico precisa de uma descrição")
            isvalid = false
        }
        return isvalid
    }
}

module.exports = Servico

