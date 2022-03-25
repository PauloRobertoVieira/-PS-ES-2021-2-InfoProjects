const EntityBase = require('./base');

class Servico extends EntityBase {

    constructor(id, name, cost, description) {
        super();
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.description = description;
    }

    validar() {
        let isvalid = true
        if (!this.name) {
            this.validation.push("Servico precisa ter name")
            isvalid = false
        } else if (this.name.length < 4) {
            this.validation.push("nome precisa mais de 4 caracteres")
            isvalid = false
        }

        if (!this.cost) {
            this.validation.push("Servico precisa ter valor")
            isvalid = false
        }

        if (!this.description) {
            this.validation.push("Servico precisa de uma descrição")
            isvalid = false
        }
        return isvalid
    }
}

module.exports = Servico

