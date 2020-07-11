class Errors {
    constructor() {
        this.errors = {
            message: '',
        };
    }

    get() {
        if (this.errors.message) {
            return this.errors.message;
        }
    }

    record(errors) {
        this.errors.message = errors;
    }
}

export default Errors;
