
# joi-country-state

#### A Joi extension that provides easy validation for country and state fields.

## Installation
```bash
npm install joi-country-state
```

## Usage

### 1. Country Validation
```javascript
import BaseJoi from 'joi';
import { countryValidator } from 'joi-country-state';

const Joi = BaseJoi.extend(countryValidator);

const countrySchema = Joi.object({
  country: Joi.country().required(),
});

const result = countrySchema.validate({ country: 'IN' });
```

### 2. State Validation
```javascript
import BaseJoi from 'joi';
import { stateValidator } from 'joi-country-state';

const Joi = BaseJoi.extend(stateValidator);

const stateSchema = Joi.object({
  state: Joi.state().forCountry('IN').required(),
});

const result = stateSchema.validate({ state: 'TN' });
```

### 3. Country and State Validation with Reference
```javascript
import BaseJoi from 'joi';
import { countryValidator, stateValidator } from 'joi-country-state';

const Joi = BaseJoi
  .extend(countryValidator)
  .extend(stateValidator);

const schema = Joi.object({
  country: Joi.country().required(),
  state: Joi.state().forCountry(Joi.ref('country')).required(),
});

const result = schema.validate({ country: 'IN', state: 'TN' });
```