# joi-country-state

#### A Joi extension that provides easy validation for country and state fields.

## Installation
`npm install joi-country-state`

## Usage
```js
import BaseJoi from 'joi';
import { countryValidator, stateValidator } from 'joi-country-state';

const Joi = BaseJoi
  .extend(countryValidator)
  .extend(stateValidator);

const schema = Joi.object({
  country: Joi.country().required(),
  state: Joi.state().required(),
});

schema.validate({
  country: 'IN',
  state: 'TN'
});
```