import {validate} from 'validate.js';

function ValidateForm ( fields, formData) { 
    const constraints = fields.reduce((rules, field) => {
        if(field.options && field.options.rules) {
            rules[field.name] = field.options.rules
        }
        return rules;
    }, {})
    const error = validate(formData, constraints)
    return error
}

export default ValidateForm