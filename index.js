"use strict";

const { Country, State } = require("country-state-city");

const countryStateValidator = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "country.invalid": "{{#label}} is not a valid country",
    "state.countryRequired":
      "A valid country is required to validate the state",
    "state.invalid":
      "{{#label}} must be a valid state code for the selected country",
  },
  rules: {
    country: {
      method() {
        return this.$_addRule("country");
      },
      validate(value, helpers) {
        if (!Country.getCountryByCode(value)) {
          return helpers.error("country.invalid");
        }

        return value;
      },
    },
    state: {
      method(country, countryStatesConfig) {
        return this.$_addRule({
          name: "state",
          args: { country, countryStatesConfig },
        });
      },
      args: [
        {
          name: "country",
          ref: true,
          assert: (value) => typeof value === "string",
          message: "must be a string",
        },
        {
          name: "countryStatesConfig",
          assert: (value) => {
            if (value === undefined) return true;
            if (typeof value !== "object") return false;
            return Object.entries(value).every(([, states]) => {
              if (!Array.isArray(states)) {
                return false;
              }
              return true;
            });
          },
          message:
            "must be an object with country codes as keys and arrays of states as values",
        },
      ],
      validate(value, helpers, args) {
        const country = args.country;
        const countryStatesConfig = args.countryStatesConfig;
        if (!country) {
          return helpers.error("state.countryRequired");
        }

        if (countryStatesConfig) {
          if (
            !countryStatesConfig[country] ||
            !countryStatesConfig[country].includes(value)
          ) {
            return helpers.error("state.invalid");
          }
        } else {
          if (!State.getStateByCodeAndCountry(value, country)) {
            return helpers.error("state.invalid");
          }
        }

        return value;
      },
    },
  },
});

module.exports = countryStateValidator;
