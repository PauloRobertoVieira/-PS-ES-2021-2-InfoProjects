class EntityBase {
    constructor() {
        this.validation = [];
    }
    validar() {
        throw new Error('Precisa ser implementado')
    }
    toJSON() {
        const { validation, ...rest } = this;
        return rest;
    }
}


module.exports = EntityBase;