class Errors {
    constructor() {
        this.errors = {};
    }

    get error(field) {
        if (this.errors[field]) {
            this.errors[field];
        }
    }

    record(errors) {
        this.errors = errors;
    }
}

export default CustomError;
