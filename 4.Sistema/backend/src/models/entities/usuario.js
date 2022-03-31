const EntityBase = require('./base');

class Usuario extends EntityBase {

    constructor(id, nome, email, senha, tipo) {
        super();
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.tipo = tipo;
    }

    validar() {
        let isvalid = true
        if (!this.nome) {
            this.validation.push("Preencher nome")
            isvalid = false
        } else if (this.nome.length < 4) {
            this.validation.push("Nome precisa mais de 4 caracteres")
            isvalid = false
        }

        if (!this.email) {
            this.validation.push("Preecher e-mail")
            isvalid = false
        }

        if (!this.senha) {
            this.validation.push("Preecher senha")
            isvalid = false
        }

        if (!this.tipo) {
            this.validation.push("Selecionar tipo")
            isvalid = false
        }

        return isvalid
    }
}

module.exports = Usuario