const validator = {
    set: (target, key, value) => {
        const allowed = ['name', 'email', 'age'];
        const ageMini = 18;
        const nameMinimmumLength = 4;

        if (!allowed.includes(key)) {
            return state.errors.record(`Le champ ${key} n'est pas valide`);
        }

        if (key === 'age') {
            let age = parseInt(value);
            if (typeof age !== 'number' || isNaN(age) || age <= ageMini) {
                return state.errors.record(
                    `${key} n'est pas un nombre ou vous n'avez pas l'age minimum requis`
                );
            }
        }

        if (key === 'name') {
            if (
                typeof value !== 'string' ||
                value.length < nameMinimmumLength
            ) {
                return state.errors.record(
                    `Quelque chose d'horrible s'est produit`
                );
            }
        }

        if (key === 'email' && !validateEmail(value)) {
            return state.errors.record(`Email invalide`);
        }

        target[key] = value;

        return true;
    },
};

const handler = {
    get: target => {
        const allowed = ['name', 'email', 'age'];
        const comparison = Object.keys(target);

        if (JSON.stringify(allowed) !== JSON.stringify(comparison)) {
            return state.errors.record(`Corrupted data`);
        }

        return target;
    },
};

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function createError() {
    if (!state.errors.get()) return;

    const div = document.createElement('div');
    div.setAttribute('id', 'error');
    const p = document.createElement('p');
    p.innerText = state.errors.get();
    div.appendChild(p);
    document.body.appendChild(div);

    clearError();
}

function clearError() {
    setTimeout(() => {
        document.querySelector('#error').remove();
    }, 3000);
}

export { validator, handler, createError };
