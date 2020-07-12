import Errors from './Errors.js';
import { validator, handler, createError } from './handlers.js';

// Validation de Formulaire avec Proxy
const person = new Proxy({}, validator);
const contacts = JSON.parse(localStorage.getItem('valid-contact')) || [];

globalThis.state = {
    errors: new Errors(),
    message: 'TODO: un success message',
};

function validateForm(e) {
    e.preventDefault();

    const inputs = this.querySelectorAll('input');

    // Ici on peut derouler, le validator s'occupe de la validation des champs
    try {
        inputs.forEach.call(inputs, input => {
            person[input.name] = input.value;
        });
        contacts.push(person);

        localStorage.setItem('valid-contact', JSON.stringify(contacts));
        document.querySelector('form').reset();
    } catch (e) {
        createError();
    }
}

(function() {
    document.querySelector('form').addEventListener('submit', validateForm);
    const persons = [];

    contacts.forEach(person => {
        persons.push(new Proxy(person, handler));
    });

    try {
        persons.forEach(person => {
            // person.name.blah = 'test'; // balance une erreur, le handler a gerer automatiquement
            console.log(person.obj.name, person.obj.age, person.obj.email);
        });
    } catch (e) {
        createError();
    }
})();
