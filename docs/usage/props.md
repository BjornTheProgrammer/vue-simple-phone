# Props

Vue Simple Phone has the following props

<script setup>
import '../../src/themes/light.css'
import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'

const { site, theme, page, frontmatter } = useData()
</script>

## region

The default region country code to use.

* Type: `String` a `ISO 3166-1` country code
* Default: `US`

```vue
<VueSimplePhone region="CN"/>
```

<VueSimplePhone region="CN"/>


## language

The display language for the country names.

* Type: [`Intl.LocalesArgument`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames)
* Default: `['zh-Hant']`

```vue
<VueSimplePhone :language="['zh-Hant']"/>
```

<VueSimplePhone :language="['zh-Hant']"/>

## value

The starting value to use.

* Type: `String`
* Default: `undefined`

```vue
<VueSimplePhone value="2345678901"/>
```

<VueSimplePhone value="2345678901"/>

## placeholder

The placeholder to use instead of the default.

* Type: `String`
* Default: the example phone number from each country

```vue
<VueSimplePhone placeholder="(555) 000-0000"/>
```

<VueSimplePhone placeholder="(555) 000-0000"/>

## countries

The list of countries to display in the dropdown as `ISO 3166-1` codes

* Type: `String[]`
* Default: [`country-flag-icons`](https://www.npmjs.com/package/country-flag-icons)'s list of countries

```vue
<VueSimplePhone :countries="['US', 'CN', 'FI', 'SE', 'MX', 'JP']"/>
```

<VueSimplePhone :countries="['US', 'CN', 'FI', 'SE', 'MX', 'JP']"/>

## disabled

Whether the input can be interacted with or not.

* Type: `Boolean`
* Default: `true`

```vue
<VueSimplePhone :disabled="true"/>
```

<VueSimplePhone :disabled="true"/>

## displayFlags

Whether or not to display flags.

* Type: `Boolean`
* Default: `true`

```vue
<VueSimplePhone :displayFlags="false"/>
```

<VueSimplePhone :displayFlags="false"/>

## opened

Whether or not the dropdown is open, note that it is not closeable, unless you change the value.

* Type: `Boolean`
* Default: `undefined`

```vue
<VueSimplePhone :opened="true"/>
```

<VueSimplePhone :opened="true" />

<div class="mt-[250px]"></div>

## Missing Something?

Create an <a :href="`${theme.socialLinks.find(social => social.icon === 'github').link}/issues`" target="_blank" rel="noreferrer">`issue`</a> on our GitHub! We very well may be able to add your feature.
