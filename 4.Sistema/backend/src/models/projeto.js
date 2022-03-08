class Projeto {

    constructor(id, name, budget) {
        this.validation = [];
        this.id = id;
        this.name = name;
        this.budget = budget;
    }

    validar() {
        let isvalid = true
        if (!this.name) {
            this.validation.push("Projeto precisa ter nome")
            isvalid = false
        } else if (this.name.length < 4) {
            this.validation.push("Nome precisa mais de 4 caracteres")
            isvalid = false
        }

        if (!this.budget) {
            this.validation.push("Projeto precisa ter valor")
            isvalid = false
        }

        return isvalid
    }
}

module.exports = Projeto

