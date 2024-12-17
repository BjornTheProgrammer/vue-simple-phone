# Additional Exports

In addition to `VueSimplePhone` component, the `vue-simple-phone` exports a few other things.

1. `supportedCountries` which is just `countries` from [`country-flag-icons`](https://www.npmjs.com/package/country-flag-icons) reexported.

```ts
import { supportedCountries } from 'vue-simple-phone'
```

2. `ParsedPhoneNumber` the resultant parsed phone number object type from [`awesome-phonenumber`](https://www.npmjs.com/package/awesome-phonenumber).

```ts
import { type ParsedPhoneNumber } from 'vue-simple-phone'
```

This is done to not require the end user to install these libraries seperately.
