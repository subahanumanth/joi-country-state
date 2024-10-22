# joi-country-state

#### A Joi extension that provides easy validation for country and state fields.

## Installation

```bash
npm install joi-country-state
```

## Usage

```javascript
import BaseJoi from "joi";
import countryStateValidator from "joi-country-state";

const Joi = BaseJoi.extend(countryStateValidator);

// Country Validation
const countrySchema = Joi.object({
  country: Joi.string().country().required(),
});
countrySchema.validate({ country: "IN" });

// State Validation
const stateSchema = Joi.object({
  state: Joi.string().state("IN").required(),
});
stateSchema.validate({ state: "TN" });

// Country & State Validation
const schema = Joi.object({
  country: Joi.string().country().required(),
  state: Joi.string().state(Joi.ref("country")).required(),
});
schema.validate({ country: "IN", state: "TN" });

// Country & State with Custom Data
const countryStateConfig = {
  IN: ["DL", "MH", "KA", "TN"],
  US: ["CA", "TX", "NY"],
};
const customSchema = Joi.object({
  country: Joi.string()
    .country()
    .valid(...Object.keys(countryStateConfig))
    .required(),
  state: Joi.string().state(Joi.ref("country"), countryStateConfig).required(),
});
customSchema.validate({ country: "IN", state: "TN" });
```
