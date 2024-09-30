'use strict';

import { Country, State } from 'country-state-city';

const countryValidator = (joi) => ({
    type: 'country',
    base: joi.string(),
    messages: {
        'country.invalid': '{{#label}} is not a valid country'
    },
    validate(value, helpers) {
        if (Country.getCountryByCode(value)) {
            return { value };
        }

        return { value, errors: helpers.error('country.invalid') };
    }
});

const stateValidator = (joi) => ({
    type: 'state',
    base: joi.string(),
    messages: {
        'state.countryRequired': 'country is required to validate state',
        'state.invalid': '{{#label}} must be a valid state code for the selected country',
    },
    validate(value, helpers) {
        const country = helpers.state.ancestors[0].country;
        if (!country) {
            return { value, errors: helpers.error('state.countryRequired') };
        }

        if (State.getStateByCodeAndCountry(value, helpers.state.ancestors[0].country)) {
            return { value };
        }

        return { value, errors: helpers.error('state.invalid') };
    }
});

export {
    countryValidator,
    stateValidator
}
