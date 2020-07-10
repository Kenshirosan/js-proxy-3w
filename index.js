// Validation de Formulaire avec Proxy
class CustomError extends Error {
    constructor(error) {
        super(error);
    }
}

const validator = {
    set: (target, key, value) => {
        const allowed = ['name', 'email', 'age'];
        const ageMini = 18;
        const nameMinimmumLength = 4;

        if (!allowed.includes(key)) {
            // Ici on pourrait appeler un fonction qui s'occupe d'afficher l'erreur pour le client
            throw new Error(`Le champ ${key} n'est pas valide`);
        }

        if (key === 'age') {
            let age = parseInt(value);
            if (typeof age !== 'number' || isNaN(age) || age <= ageMini) {
                throw new Error(
                    // Ici on pourrait AUSSI :) appeler un fonction qui s'occupe d'afficher l'erreur pour le client
                    `${key} n'est pas un nombre ou vous n'avez pas l'age minimum requis`
                );
            }
        }

        if (key === 'name') {
            if (
                typeof value !== 'string' ||
                value.length < nameMinimmumLength
            ) {
                // Ici on pourrait AUSSI :) appeler un fonction qui s'occupe d'afficher l'erreur pour le client
                throw new Error(`Quelque chose d'horrible s'est produit`);
            }
        }

        if (key === 'email' && !validateEmail(value)) {
            // Ici on pourrait AUSSI :) appeler un fonction qui s'occupe d'afficher l'erreur pour le client
            throw new Error(`Email invalide`);
        }

        target[key] = value;

        return true;
    },
};

const handler = {
    get: (target, value) => {
        const allowed = ['name', 'email', 'age'];
        const comparison = Object.keys(target);

        if (JSON.stringify(allowed) !== JSON.stringify(comparison)) {
            // Ici on pourrait appeler un fonction qui s'occupe d'afficher l'erreur pour le client
            throw new CustomError(`Corrupted data`);
        }

        return target;
    },
};

function validateForm(e) {
    e.preventDefault();

    const inputs = document.querySelectorAll('input');

    // Ici on peut derouler, le validator s'occupe de la validation des champs
    // Si invalide: Error interrompt l'execution.
    inputs.forEach.call(inputs, input => {
        person[input.name] = input.value;
    });

    contacts.push(person);

    localStorage.setItem('valid-contact', JSON.stringify(contacts));
}

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const person = new Proxy({}, validator);
const contacts = JSON.parse(localStorage.getItem('valid-contact')) || [];

(function() {
    document.querySelector('form').addEventListener('submit', validateForm);
    if (!contacts) return;

    const persons = [];

    contacts.forEach(person => {
        persons.push(new Proxy(person, handler));
    });

    persons.forEach(person => {
        person.name.blah = 'test'; // balance une erreur, le handler a gerer automatiquement
        console.log(person.name.name, person.name.age, person.name.email);
    });
})();
