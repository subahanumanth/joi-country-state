'use strict';

const { Country, State } = require('country-state-city');

const countryValidator = (joi) => ({
    type: 'country',
    base: joi.string(),
    messages: {
        'country.invalid': '{{#label}} is not a valid country'
    },
    validate(value, helpers) {
        if (!Country.getCountryByCode(value)) {
            return { value, errors: helpers.error('country.invalid') };
        }
    }
});

const stateValidator = (joi) => ({
    type: 'state',
    base: joi.string(),
    messages: {
        'state.countryRequired': 'country is required to validate state',
        'state.invalid': '{{#label}} must be a valid state code for the selected country',
    },
    rules: {
        forCountry: {
            method(country) {
                return this.$_addRule({ name: 'forCountry', args: { country } });
            },
            args: [
                {
                    name: 'country',
                    ref: true,
                    assert: (value) => typeof value === 'string',
                    message: 'must be an string'
                }
            ],
            validate(value, helpers, args) {
                const country = args.country;
                if (!country) {
                    return helpers.error('state.countryRequired');
                }

                if (!State.getStateByCodeAndCountry(value, country)) {
                    return helpers.error('state.invalid');
                }

                return value;
            }
        },
    }
});

module.exports = {
    countryValidator,
    stateValidator
}
