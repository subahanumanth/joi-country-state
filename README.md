# joi-country-state

#### A Joi extension that provides easy validation for country and state fields.

## Installation

```bash
npm install joi-country-state
```

## Usage

### 1. Country Validation

```javascript
import BaseJoi from "joi";
import countryStateValidator from "joi-country-state";

const Joi = BaseJoi.extend(countryStateValidator);

const countrySchema = Joi.object({
  country: Joi.string().country().required(),
});

const result = countrySchema.validate({ country: "IN" });
```

### 2. State Validation

```javascript
import BaseJoi from "joi";
import countryStateValidator from "joi-country-state";

const Joi = BaseJoi.extend(countryStateValidator);

const stateSchema = Joi.object({
  state: Joi.string().state("IN").required(),
});

const result = stateSchema.validate({ state: "TN" });
```

### 3. Country and State Validation

```javascript
import BaseJoi from "joi";
import countryStateValidator from "joi-country-state";

const Joi = BaseJoi.extend(countryStateValidator);

const schema = Joi.object({
  country: Joi.string().country().required(),
  state: Joi.string().state(Joi.ref("country")).required(),
});

const result = schema.validate({ country: "IN", state: "TN" });
```

### 4. Country and State Validation With Custom Data

You can also validate the state by passing a country-specific configuration object. This allows you to define valid states for each country directly in the validation schema.

```javascript
import BaseJoi from "joi";
import countryStateValidator from "joi-country-state";

const Joi = BaseJoi.extend(countryStateValidator);

// Define your country-state mapping
const countryStateConfig = {
  IN: ["DL", "MH", "KA", "TN"], // Delhi, Maharashtra, Karnataka, Tamil Nadu
  US: ["CA", "TX", "NY"], // California, Texas, New York
};

const schema = Joi.object({
  country: Joi.string()
    .country()
    .valid(...Object.keys(countryStateConfig))
    .required(),
  state: Joi.string().state(Joi.ref("country"), countryStateConfig).required(),
});

const result = schema.validate({ country: "IN", state: "TN" });
```
